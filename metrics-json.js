import express from 'express';

const AUTH_STRING = Buffer.from(`:${process.env.API_TOKEN}`).toString('base64');
const app = express();
const port = 3000;

let cachedKumaStatus = true;
let cachedData = [];
let isKumaDown = false;

function snakeToCamel(s) {
    return s.replace(/(_\w)/g, function(m){return m[1].toUpperCase();});
}

app.get("/metrics", (req, res) => {
    res.set("Content-Type", "application/json");
    res.set("Accept", "application/json");

    if (isKumaDown) {
        res.status(502);
        res.send({
            success: false,
            data: {
                error: "Received non-OK response when contacting Uptime Kuma instance.",
            },
        });
        return;
    }

    if (cachedData.length === 0) {
        res.status(500);
        res.send({
            success: false,
            data: {
                error: "No data available yet.",
            },
        });
        return;
    }

    if (!cachedKumaStatus) {
        res.status(500);
        res.send({
            success: false,
            data: {
                error: "Unable to fetch data from Uptime Kuma instance."
            }
        });
        return;
    }

    res.status(200);
    res.send({
        success: true,
        data: {
            monitors: cachedData,
        }
    });
});

setTimeout(function pull() {
    console.log("initiating monitor update process")
    fetch("http://10.20.0.12:3001/metrics", {
        headers: {
            "Authorization": `Basic ${AUTH_STRING}`,
        }
    })
        .then((res) => {
            if (!res.ok) {
                isKumaDown = true;
                cachedData = [];
                throw new Error('uptime kuma is down');
            }

            isKumaDown = false;
            return res.text();
        })
        .then((text) => {
            if (text.startsWith("Migration is in progress")) {
                isKumaDown = true;
                cachedKumaStatus = false;
                cachedData = [];
                console.error('unable to get data from uptime kuma: migration is in progress');
                return;
            }

            const lines = text.split("\n");
            const monitors = [];
            for (let line of lines) {
                if (!line.startsWith("monitor_status{")) {
                    continue;
                }

                const monitorData = {};
                const obj = line.substring(line.indexOf("{"), line.indexOf("}") + 1);
                const props = obj.substring(1, obj.length - 1).split(",");

                for (let prop of props) {
                    let [ k, v ] = prop.split("=");
                    k = snakeToCamel(k);
                    v = v.substring(1, v.length - 1);

                    if (v === "null") {
                        v = null;
                    }

                    monitorData[k] = v;
                }

                if (monitorData["monitorHostname"] === null) {
                    continue;
                }

                switch (line.substring(line.length - 1)) {
                    case "0":
                        monitorData["monitorStatus"] = "offline";
                        break;
                    case "1":
                        monitorData["monitorStatus"] = "online";
                        break;
                    default:
                        monitorData["monitorStatus"] = "unknown";
                        break;
                }

                console.log(monitorData);
                monitors.push(monitorData);
            }
            cachedData = monitors;
            cachedKumaStatus = true;
            console.log("stored data for " + monitors.length + " monitors");
        })
        .catch((err) => {
            console.error(err);
            cachedKumaStatus = false;
        });
    setTimeout(pull, 15000);
}, 0);

app.listen(port);
console.log("launched web endpoint")

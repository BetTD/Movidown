import express from 'express';

const AUTH_STRING = Buffer.from(`:${process.env.API_TOKEN}`).toString('base64');
const app = express();
const port = 3000;

let cachedKumaStatus = true;
let cachedData = [];

console.log(AUTH_STRING);

app.get("/metrics", (req, res) => {
    res.set("Content-Type", "application/json");
    res.set("Accept", "application/json");
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

setInterval(() => {
    console.log("initiating monitor update process")
    fetch("http://192.168.0.12:3001/metrics", {
        headers: {
            "Authorization": Buffer.from(`:${process.env.API_TOKEN}`).toString('base64'),
        }
    })
        .then((res) => {
            console.log(res);
            return res.text();
        })
        .then((text) => {
            console.log("got response: " + text);
            const lines = text.split("\n");
            const monitors = [];
            for (let line of lines) {
                if (!line.startsWith("monitor_status{")) {
                    return;
                }

                const monitorData = {};
                const obj = line.substring(line.indexOf("{"));
                const props = obj.substring(1, obj.length - 1).split(",");
                for (let prop of props) {
                    const [ k, v ] = prop.split("=");
                    monitorData[k] = v.substring(1, v.length - 1);
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
}, 15000);

app.listen(port);
console.log("launched web endpoint")

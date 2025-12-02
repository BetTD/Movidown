let overallStatus = true;
/** @type {{ name: string, status: string }[]} */
let monitors = [];

function getCurrentUrl() {
    let url = window.location.protocol + "//" + window.location.host + window.location.pathname;

    if (url.endsWith("/index.php")) {
        url = url.substring(0, url.length - 9);
    }

    return url;
}

function fetchData() {
    fetch(getCurrentUrl() + "status.php", {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    })
        .then((res) => res.json())
        .then((data) => {
            if (!data.success) {
                console.error("Failed to obtain data.", data);
                overallStatus = "unknown";
                monitors = [];
                return;
            }

            const mons = data.data.monitors;

            if (mons.length === 0) {
                console.error("No monitors available.");
                $("#status-header").text("¿No hay IPs? :(");
                return;
            }

            let onlineCount = 0;
            let offlineCount = 0;

            monitors = [];

            for (let monitor of mons) {
                const name = monitor["monitorName"];
                const status = monitor["monitorStatus"];

                monitors.push({
                    name: name,
                    status: status,
                });

                if (status === "online") {
                    onlineCount++;
                } else if (status === "offline") {
                    offlineCount++;
                } else {
                    console.error("Unknown status for " + name + ": " + status);
                }
            }

            if (offlineCount === 0 && onlineCount === mons.length) {
                overallStatus = true;
            } else if (onlineCount === 0 && offlineCount === mons.length) {
                overallStatus = false;
            } else {
                overallStatus = "some";
            }

            render();
        })
}

function render() {
    const header = $("header");
    const headerText = $("#status-header");
    const miniStatus = $("#mini-status");

    switch (overallStatus) {
        case "some":
            headerText.html(`<span class="status-remark warn">Sí,</span> Movistar está bloqueando Cloudflare parcialmente.`);
            miniStatus.html(`¿Está Movistar bloqueando Cloudflare? <span class="mini-status warn"><i class="fa-solid fa-warning"</span>`);
            header.attr("class", "offline");
            break;
        case true:
            headerText.html(`<span class="status-remark online">No,</span> Movistar no está bloqueando Cloudflare.`);
            miniStatus.html(`¿Está Movistar bloqueando Cloudflare? <span class="mini-status online"><i class="fa-solid fa-xmark-circle"></i></span>`);
            header.attr("class", "online");
            break;
        case false:
            headerText.html(`<span class="status-remark offline">Sí,</span> Movistar está bloqueando Cloudflare totalmente.`);
            miniStatus.html(`¿Está Movistar bloqueando Cloudflare? <span class="mini-status offline"><i class="fa-solid fa-check-circle"></i></span>`);
            header.attr("class", "offline");
            break;
    }

    let monitorsString = "";

    for (let monitor of monitors) {
        let statusIcon = "";

        switch (monitor.status) {
            case "online":
                statusIcon = `<i class="fa-solid fa-check-circle"></i>`;
                break;
            case "offline":
                statusIcon = `<i class="fa-solid fa-xmark-circle"></i>`;
                break;
            default:
                statusIcon = `<i class="fa-solid fa-question"></i>`;
        }

        // extract the text within parentheses
        let monitorName = monitor.name.replace(/\(([^)]+)\)/, '<span class="monitor-remark">($1)</span>');

        monitorsString += `<div class="monitor ${monitor.status}">
            <div class="monitor-name">${monitorName}</div>
            <div class="monitor-status ${monitor.status}">${statusIcon}</div>
        </div>
`;
    }

    $(".monitors-grid").html(monitorsString);
}

setTimeout(function tick() {
    fetchData();
    setTimeout(tick, 20000);
}, 0)

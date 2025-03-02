function fetchData() {
    fetch(window.location.protocol + "//" + window.location.host + "/status.php", {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    })
        .then((res) => res.json())
        .then((data) => {
            if (!data.success) {
                console.error(data.data.error);
                return;
            }
            console.log(data.data.monitors);
        })
}

setTimeout(function tick() {
    fetchData();
    setTimeout(tick, 60000);
}, 0)

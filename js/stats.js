function requestStats() {
    let r = new XMLHttpRequest();
    r.open('POST', 'saveStats.php', true);
    r.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    return r;
}

function saveStats(stats){
    let r = requestStats();
    r.send(stats);
    return r;
}
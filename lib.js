function distance(lat1, lon1, lat2, lon2) {
    var radlat1 = Math.PI * lat1 / 180
    var radlat2 = Math.PI * lat2 / 180
    var theta = lon1 - lon2
    var radtheta = Math.PI * theta / 180
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
        dist = 1;
    }

    dist = Math.acos(dist)
    dist = dist * 180 / Math.PI
    dist = dist * 60 * 1.1515

    return dist
}

function formatPhone(val) {
    return val.toString().replace(/(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})/, "+$1 ($2) $3-$4-$5")
}

module.exports = {
    distance,
    formatPhone,
}
// TODO refactor exported functions
export const markerIsContiguousUsa = (lat: Number, lon: Number) => {
    if (lat >= 19.50139 && lat <= 64.85694 && lon >= -161.75583 && lon <= -68.01197) {
        return true;
    } else {
        return false;
    }
}

export const markersAreContiguousUsa = (markers: any) => {
    let areContiguous = true;
    for (let i = 0; i < markers.length; i++) {
        if (!markerIsContiguousUsa(markers[i].latitude, markers[i].longitude)) {
            areContiguous = false;
        }
    }

    return areContiguous;
}
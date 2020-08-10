// TODO refactor exported functions
export const markerIsContiguousUsa = (lat: Number, lon: Number) => {
    if (lat >= 19.50139 && lat <= 64.85694 && lon >= -161.75583 && lon <= -68.01197) {
        return true;
    }
    
    return false;
}

export const markersAreContiguousUsa = (markers: any) => {
    for (let i = 0; i < markers.length; i++) {
        if (!markerIsContiguousUsa(markers[i].latitude, markers[i].longitude)) {
            return false;
        }
    }

    return true;
}

export const isNullIsland = (lat: number, lon: number) => {
    if (lat == 0. && lon == 0.) {
        return true;
    }

    return false;
}
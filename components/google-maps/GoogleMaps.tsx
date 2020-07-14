import React from "react";

import CustomMarker from "./CustomMarker";
import GoogleMapReact from "google-map-react";

const GoogleMaps = () => {
    return (
        <div style={{ height: "500px", width: "100%" }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.dev.GOOGLE_MAPS_KEY }}
                defaultZoom={10}
                defaultCenter={{ lat: 37.60363, lng: -122.397202 }}
                hoverDistance={10}
            >
                <CustomMarker text="hello world" lat={37.60363} lng={-122.397202} />
            </GoogleMapReact>
        </div>
    );
};

export default GoogleMaps;

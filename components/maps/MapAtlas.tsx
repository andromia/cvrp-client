import React, { useEffect } from "react";

import { geoPath } from "d3";


const MapAtlas = (props) => {
    const path = geoPath(props.projection);

    if (!props.atlasJson) {
        return <pre>Loading...</pre>;
    }

    return (
        <g className="atlas">
            {props.atlasJson.features.map(feature => (<path className="atlas" d={path(feature)} />))}
        </g>
    );
}

export default MapAtlas;
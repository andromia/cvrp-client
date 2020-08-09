import { useState } from "react";

import MapAtlas from "./MapAtlas";
import MapLine from "./MapLine";
import MapCircle from "./MapCircle";

import { geoMercator } from "d3";


// TODO: init to center world with no inputs
// then zoom to plotted origin using 500-600 scale
const projection = geoMercator()
    .center([0., 0.])
    .scale(100);
    // TODO: .translate([ w/2, h/2 ]); and use responsive parent profile 

const VrpBubbleMap = (props) => {
    
    if (!props.atlasJson) {
        return <pre>Loading...</pre>;
    }

    return (
        <g className="vrp-bubble-map">
            <MapAtlas 
            atlasJson={props.atlasJson} 
            projection={projection} // TODO: lift state?
            originLat={props.originLat}
            originLon={props.originLon} />
            {props.routes.map(r => (
                <MapLine 
                stops={r.stops} 
                projection={projection} />
            ))}
            {props.demand.map(d => (
                <MapCircle 
                name={"demand"} 
                lat={d.latitude} 
                lon={d.longitude} 
                size={3}
                projection={projection} />
            ))}
            <MapCircle 
            name={"origin"} 
            lat={props.originLat} 
            lon={props.originLon} 
            size={6}
            projection={projection} />
        </g>
    );
}

export default VrpBubbleMap;
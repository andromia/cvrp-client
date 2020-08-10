import { useState, useRef } from "react";

import MapAtlas from "./MapAtlas";
import MapLine from "./MapLine";
import MapCircle from "./MapCircle";

import { select, geoMercator } from "d3";
import { create } from "domain";


const VrpBubbleMap = (props) => {
    const svgRef = useRef(null),
          projection = geoMercator()
            .center([0., 0.])
            .scale(100)
            .translate([ props.width / 2, props.height / 2 ]);
    
    if (!props.atlasJson) {
        return <pre>Loading...</pre>;
    }
    
    return (
        <svg
        ref={svgRef}
        height={props.height}
        width={props.width}>
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
        </svg>
    );
}

export default VrpBubbleMap;
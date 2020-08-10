import MapAtlas from "./MapAtlas";
import MapLine from "./MapLine";
import MapCircle from "./MapCircle";

import { geoMercator } from "d3";


const demandCircleSize = 3;
const originCircleSize = 6;

const isNullIsland = (lat: number, lon: number) => {
    if (lat == 0. && lon == 0.) {
        return true;
    }

    return false;
}

const VrpBubbleMap = (props) => {
    const projection = geoMercator()
            .center([props.originLon, props.originLat])
            .scale(isNullIsland(props.originLat, props.originLon) ? 100 : 600)
            .translate([ props.width / 2, props.height / 2 ]);
    
    if (!props.atlasJson) {
        return <pre>Loading...</pre>;
    }
    
    return (
        <svg
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
                    projection={projection}
                    size={demandCircleSize} />
                ))}
                {!isNullIsland(props.originLat, props.originLon) &&
                    <MapCircle 
                    name={"origin"} 
                    lat={props.originLat} 
                    lon={props.originLon} 
                    projection={projection}
                    size={originCircleSize} />
                }
            </g>
        </svg>
    );
}

export default VrpBubbleMap;
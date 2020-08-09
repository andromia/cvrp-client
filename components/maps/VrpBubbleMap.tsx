import MapAtlas from "./MapAtlas";
import MapLine from "./MapLine";
import MapCircle from "./MapCircle";

import { geoMercator } from "d3";
import { useUsaJson } from "./MapJson";


const projection = geoMercator();

const VrpBubbleMap = (props) => {
    const atlasJson = useUsaJson();

    return (
        <g className="vrp-bubble-map">
            <MapAtlas 
            atlasJson={atlasJson} 
            projection={projection} />
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
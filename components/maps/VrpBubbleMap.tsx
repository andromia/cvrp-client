import { MapAtlas } from "./MapAtlas";
import { MapLine } from "./MapLine";
import { MapCircle } from "./MapCircle";


export const VrpBubbleMap = (props) => {

    return (
        <g className="vrp-bubble-map">
            <MapAtlas 
            worldAtlas={props.worldAtlas} 
            projection={props.projection} />
            {props.data.routes.map(r => (
                <MapLine 
                stops={r.stops} 
                projection={props.projection} />
            ))}
            {props.data.demand.map(d => (
                <MapCircle 
                name={"demand"} 
                lat={d.latitude} 
                lon={d.longitude} 
                size={3}
                projection={props.projection} />
            ))}
            <MapCircle 
            name={"origin"} 
            lat={props.data.originLat} 
            lon={props.data.originLon} 
            size={6}
            projection={props.projection} />
        </g>
    );
}

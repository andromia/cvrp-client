import { geoPath } from "d3";


const MapLine = (props) => {
    const path = geoPath().projection(props.projection);
    const lineStrings = {type: "LineString", coordinates: props.stops};

    return (
        <path 
        className="line" 
        d={path(lineStrings)}
        fill={"none"}
        stroke={"#0000ff"}
        stroke-width={"2px"}
        opacity={.6} />
    );
}

export default MapLine;
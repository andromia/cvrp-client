import { geoPath } from "d3";

export const MapAtlas = (props) => {
    const path = geoPath(props.projection);

    return (
        <g className="atlas">
            {props.worldAtlas.features.map(feature => (<path className="atlas" d={path(feature)} />))}
        </g>
    );
}
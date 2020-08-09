import { geoPath } from "d3";


const MapAtlas = (props) => {
    const atlasPath = geoPath(props.projection);
        
    return (
        <g className="atlas">
            {props.atlasJson.features.map(feature => (
                <path 
                className="atlas-path" 
                fill="#b8b8b8" 
                d={atlasPath(feature)} />
            ))}
        </g>
    );
}

export default MapAtlas;
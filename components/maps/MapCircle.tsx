/*
* TODO:
* - add x2 when second dimension is configured for model
*/
const circleStrokeColor: string = "#69b3a2";
const cicleOpacity: number = .4;

const MapCircle = (props) => {
    const cx = props.projection([props.lon, props.lat])[0];
    const cy = props.projection([props.lon, props.lat])[1];

    return (
        <circle 
        className={props.name}
        cx={cx} 
        cy={cy} 
        r={props.size}
        stroke={circleStrokeColor}
        strokeWidth={props.size/4}
        fillOpacity={cicleOpacity}>
            <title>{"lat: " + props.lat + " lon: " + props.lon + " x1: " + props.d0}</title>
        </circle>
    );
}

export default MapCircle;
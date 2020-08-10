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
        stroke-width={props.size/4}
        fill-opacity={cicleOpacity}>
            <title>{"lat: " + props.lat + " lon: " + props.lon}</title>
        </circle>
    );
}

export default MapCircle;
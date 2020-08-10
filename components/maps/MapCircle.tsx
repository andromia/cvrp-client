const MapCircle = (props) => {
    const cx = props.projection([props.lon, props.lat])[0];
    const cy = props.projection([props.lon, props.lat])[1];

    return (
        <circle 
        className={props.name}
        cx={cx} 
        cy={cy} 
        r={props.size}
        stroke={"#69b3a2"}
        stroke-width={props.size/4}
        fill-opacity={.4}>
            <title>{"lat: " + props.lat + " lon: " + props.lon}</title>
        </circle>
    );
}

export default MapCircle;
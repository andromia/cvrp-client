const MapCircle = (props) => {
    const cx = props.projection([props.lon, props.lat])[0];
    const cy = props.projection([props.lon, props.lat])[1];

    return (
        <circle 
        className={props.name} 
        cx={cx} 
        cy={cy} 
        r={props.size} />
    );
}

export default MapCircle;
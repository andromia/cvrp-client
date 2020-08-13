import React, { ReactElement } from "react";

// Bootstrap
import Image from "react-bootstrap/Image";

const AppIcon = (props): ReactElement => {
    return <a href={props.link}><Image src="/app_icon.png" roundedCircle height="75px" /></a>;
};

export default AppIcon;

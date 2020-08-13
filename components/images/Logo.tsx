import React, { ReactElement } from "react";

// Bootstrap
import Image from "react-bootstrap/Image";

const Logo = (): ReactElement => {
    return <a href="/"><Image src="/logo.png" roundedCircle height="110px" /></a>;
};

export default Logo;

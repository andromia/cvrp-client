import React, { ReactElement } from "react";

// Bootstrap
import Image from "react-bootstrap/Image";

const Logo = (): ReactElement => {
    return <Image src="/logo.png" roundedCircle height="110px" />;
};

export default Logo;

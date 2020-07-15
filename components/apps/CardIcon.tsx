import React from "react";
import styled from "styled-components";

// Components
import AppIcon from "../images/AppIcon";

const CustomContainer = styled.div`
    position: absolute;
    left: -5px;
    top: -5px;
`;

const CardIcon = () => {
    return (
        <CustomContainer>
            <AppIcon />
        </CustomContainer>
    );
};

export default CardIcon;

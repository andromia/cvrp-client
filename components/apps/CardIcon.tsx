import React from "react";
import styled from "styled-components";

// Components
import AppIcon from "../images/AppIcon";

const CustomContainer = styled.div`
    position: absolute;
    left: -30px;
    top: -30px;
`;

const CardIcon = (props) => {
    return (
        <CustomContainer>
            <AppIcon link={props.link} />
        </CustomContainer>
    );
};

export default CardIcon;

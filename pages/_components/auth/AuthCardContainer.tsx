import React, { ReactElement } from "react";
import styled from "styled-components";

// Bootstrap
import Card from "react-bootstrap/Card";

// Styled
const StyledCard = styled(Card)`
    @media (max-width: 1099px) {
        min-height: 50%;
        width: 95%;
        margin-bottom: 10%;
    }

    @media (min-width: 1100px) {
        min-height: 50%;
        width: 50%;
        margin-bottom: 15%;
    }

    .card-body {
        padding: 66px;
    }
`;

interface Props {
    children: ReactElement;
}

const AuthCardContainer = (props: Props): ReactElement => {
    return (
        <StyledCard>
            <Card.Body>{props.children}</Card.Body>
        </StyledCard>
    );
};

export default AuthCardContainer;

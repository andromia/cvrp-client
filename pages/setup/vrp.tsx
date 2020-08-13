import React from "react";

// Bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import CustomNav from "../../components/common/CustomNav";
import VrpSetup from "../../components/setup/VrpSetup";


const VRP = () => {
    return (
        <Container>
            <CustomNav />
            <Row className="d-flex flex-column justify-content-center align-items-center w-75 mx-auto">
                <Col className="pt-3">
                    <VrpSetup />
                </Col>
            </Row>
        </Container>
    );
};

export default VRP;

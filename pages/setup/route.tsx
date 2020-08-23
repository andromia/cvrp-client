import React from "react";

// Bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import CustomNav from "../../components/common/CustomNav";
import RouteSetup from "../../components/setup/RouteSetup";


const Route = () => {
    return (
        <Container>
            <CustomNav />
            <Row className="d-flex flex-column justify-content-center align-items-center w-75 mx-auto">
                <Col className="pt-3">
                    <RouteSetup />
                </Col>
            </Row>
        </Container>
    );
};

export default Route;

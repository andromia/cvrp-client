import React from "react";

// Bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import Search from "../../components/setup/Search";
import VrpSetup from "../../components/setup/Vrp";


const VRP = () => {
    return (
        <Container>
            <Row className="d-flex flex-column justify-content-center align-items-center w-75 mx-auto">
                <Col className="my-5 pt-3">
                    <Search />
                </Col>
                <Col className="pt-3">
                    <VrpSetup />
                </Col>
            </Row>
        </Container>
    );
};

export default VRP;

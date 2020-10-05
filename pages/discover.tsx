import React from "react";

// Bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import CustomNav from "../components/common/CustomNav";
import StackCardWithIcon from "../components/users/StackCardWithIcon"; // NOTE: for MVP use the already-completed user components


const Discover = () => {
    return (
        <Container>
            <CustomNav />
            <Row className="d-flex flex-column justify-content-center align-items-center w-75 mx-auto">
                <h1>Discover</h1>
            </Row>
            <hr/>
            <Row className={"d-flex flex-column justify-content-center align-items-center pb-4 mb-2 w-50 mx-auto"}>
                <Col>
                    <StackCardWithIcon 
                    title={"Route"}
                    sub={"Super Module (created by @cnp)"}
                    desc={"shipment routing for origin-positioned & geocoded demand .csv data"}
                    link={"/stack/route"} />
                </Col>
            </Row>
            <hr/>
            <Row className={"d-flex flex-column justify-content-center align-items-center pb-4 mb-2 w-50 mx-auto"}>
                <Col>
                    <StackCardWithIcon 
                    title={"Geocode"}
                    sub={"Coming soon..."}
                    desc={"geocode zipodes for .csv files"}
                    link={""} />
                </Col>
            </Row>
            <Row className={"d-flex flex-column justify-content-center align-items-center pb-4 mb-2 w-50 mx-auto"}>
                <Col>
                    <StackCardWithIcon 
                    title={"Depot"}
                    sub={"Coming soon..."}
                    desc={"origin location positioning within geocoded demand .csv data"}
                    link={""} />
                </Col>
            </Row>
            <Row className={"d-flex flex-column justify-content-center align-items-center pb-4 mb-2 w-50 mx-auto"}>
                <Col>
                    <StackCardWithIcon 
                    title={"Chained Stack Demo"}
                    sub={"Geocode, Depot, Route (Coming soon...)"}
                    desc={"this is an example of a stack a user creates to chain multiple stacks together"}
                    link={""} />
                </Col>
            </Row>
        </Container>
    );
};

export default Discover;

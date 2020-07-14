import React from "react";

// Components
import AppsCardWithIcon from "./AppsCardWithIcon";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SearchBar from "./SearchBar";

const AppsBoard = () => {
    return (
        <div>
            <Row className={"pb-4 mb-2"}>
                <Col>
                    <AppsCardWithIcon />
                </Col>
                <Col>
                    <AppsCardWithIcon />
                </Col>
            </Row>
            <Row className={"pb-5"}>
                <Col>
                    <AppsCardWithIcon />
                </Col>
                <Col>
                    <AppsCardWithIcon />
                </Col>
            </Row>
            <hr />
            <Row className={"pt-5 pb-4 mb-2"}>
                <Col>
                    <AppsCardWithIcon />
                </Col>
                <Col className="d-flex justify-content-center flex-column">
                    <SearchBar />
                </Col>
            </Row>
            <Row className={"pb-4 mb-2"}>
                <Col>
                    <AppsCardWithIcon />
                </Col>
            </Row>
            <Row className={"pb-4 mb-2"}>
                <Col>
                    <AppsCardWithIcon />
                </Col>
            </Row>
        </div>
    );
};

export default AppsBoard;

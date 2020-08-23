import React from "react";

// Components
import ModuleCardWithIcon from "./ModuleCardWithIcon";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SearchBar from "./SearchBar";

const UserBoard = () => {
    return (
        <div>
            <Row className={"pb-4 mb-2"}>
                <Col>
                    <ModuleCardWithIcon 
                    title={"Geocode"}
                    sub={"@fingafrog (andromia)"}
                    desc={"geocoding module for clean zipcodes"}
                    link={"/setup/geocode"} />
                </Col>
                <Col>
                    <ModuleCardWithIcon
                    title={"Depot"}
                    sub={"@fingafrog (andromia)"}
                    desc={"origin location selection module for routing and network flow"}
                    link={"/setup/depot"} />
                </Col>
                <Col>
                    <ModuleCardWithIcon
                    title={"Route"}
                    sub={"@fingafrog (andromia)"}
                    desc={"shipment routing module for geocoded demand"}
                    link={"/setup/route"} />
                </Col>
            </Row>
            <hr />
            <Row className={"pt-5 pb-4 mb-2"}>
                <Col>
                    <ModuleCardWithIcon 
                    title={"Featured Stack"}
                    sub={""}
                    desc={"this is an example featured stack"}
                    link={""} />
                </Col>
                <Col className="d-flex justify-content-center flex-column">
                    <SearchBar />
                </Col>
            </Row>
            {false &&
            <Row className={"pb-4 mb-2"}>
                <Col>
                    <ModuleCardWithIcon 
                    title={"Search Result"}
                    sub={""}
                    desc={"this is an example search result"}
                    link={""} />
                </Col>
            </Row>
            }
            {false &&
            <Row className={"pb-4 mb-2"}>
                <Col>
                    <ModuleCardWithIcon 
                    title={"Search Result"}
                    sub={""}
                    desc={"this is an example search result"}
                    link={""} />
                </Col>
            </Row>
            }
        </div>
    );
};

export default UserBoard;

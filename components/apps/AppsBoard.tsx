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
                    <AppsCardWithIcon 
                    title={"Geocode"}
                    sub={"@fingafrog (andromia)"}
                    desc={"geocoding module for clean zipcodes"}
                    link={"/setup/geocode"} />
                </Col>
                <Col>
                    <AppsCardWithIcon
                    title={"Vrp Origin"}
                    sub={"@fingafrog (andromia)"}
                    desc={"origin location selection module for routing and network flow"}
                    link={"/setup/vrp-origin"} />
                </Col>
                <Col>
                    <AppsCardWithIcon
                    title={"Vrp"}
                    sub={"@fingafrog (andromia)"}
                    desc={"shipment routing module for geocoded demand"}
                    link={"/setup/vrp"} />
                </Col>
            </Row>
            <hr />
            <Row className={"pt-5 pb-4 mb-2"}>
                <Col>
                    <AppsCardWithIcon 
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
                    <AppsCardWithIcon 
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
                    <AppsCardWithIcon 
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

export default AppsBoard;

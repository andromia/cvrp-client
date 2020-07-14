import React, { useState } from "react";

// Bootstrap
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";
import CustomMarker from "../google-maps/CustomMarker";
import GoogleMaps from "../google-maps/GoogleMaps";
import Button from "react-bootstrap/Button";

const FormSetup = () => {
    const [fileName, setFileName] = useState("File Input");

    const onFileSubmit = e => {
        const newFileName = e.target.value.split("\\").splice(-1)[0];
        setFileName(newFileName);
    };

    return (
        <Card>
            <Card.Body>
                <Row className="mb-4">
                    <Col lg="6">
                        <Row className="d-flex flex-column">
                            <Col className="pb-3">
                                <div>Origin</div>
                            </Col>
                            <Col>
                                <Row>
                                    <Col>
                                        <FormControl className="d-inline-flex" placeholder="Lat." aria-label="Lat." />
                                    </Col>
                                    <Col>
                                        <FormControl className="d-inline-flex" placeholder="Lon." aria-label="Lon." />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                    <Col lg="6">
                        <Row className="d-flex flex-column">
                            <Col className="pb-3">
                                <div>Demand</div>
                            </Col>
                            <Col>
                                <Form.File id="custom-file" label={fileName} custom onChange={onFileSubmit} />
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row className="mb-4">
                    <Col className="p-0">
                        <GoogleMaps />
                    </Col>
                </Row>
                <Row className="d-flex justify-content-end">
                    <Col lg="auto">
                        <Button>Check</Button>
                    </Col>
                    <Col lg="auto">
                        <Button>Create</Button>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default FormSetup;

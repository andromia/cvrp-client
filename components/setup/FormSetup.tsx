import React, { useState } from "react";
import Papa from "papaparse";

// Bootstrap
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";
import OriginMap from "../maps/Origin";
import Button from "react-bootstrap/Button";


const assert = require('assert');
const axios = require('axios');

function checkCsvData(csvData) {
    assert(csvData); // TODO
}

function checkNum(val) {
    assert(Number(val));
}

function checkUnit(unit, data) {
    assert(data[0].hasOwnProperty(unit));
}

function getVrpSolution(data) {
    axios.post(process.env.dev.VRP_RPC_URL, data)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
}

const FormSetup = () => {
    // TODO: const?
    const [fileName, setFileName] = useState("demand file");
    
    const onFileSubmit = event => {
        setFileName(event.target.value.split("\\").splice(-1)[0]);
    };

    // handle api integration
    const onCreateSubmit = event => {
        event.preventDefault();

        // TODO: figure out how to properly ref
        let dataObj = {
            origin_latitude: event.target[0].value,
            origin_longitude: event.target[1].value,
            vehicle_max_capacity_quantity: event.target[2].value,
            vehicle_definitions: [],
            unit: event.target[3].value,
            demand: [],
        }

        checkNum(dataObj.origin_latitude);
        checkNum(dataObj.origin_latitude);
        checkNum(dataObj.vehicle_max_capacity_quantity);
        
        Papa.parse(event.target[10].files[0], {
            header: true,
            complete: function(results) {
                checkCsvData(results);
                checkUnit(dataObj.unit, results.data);

                dataObj.demand = results.data;
                console.log("data object", dataObj);

                getVrpSolution(dataObj);
            }
        });
    };

    return (
        <Card>
            <Card.Body>
                <Form onSubmit={onCreateSubmit}>
                    <Row className="mb-4">
                        <Col lg="6">
                            <Row className="d-flex flex-column">
                                <Col className="pb-3">
                                    <div>Origin</div>
                                </Col>
                                <Col>
                                    <Row>
                                        <Col>
                                            <FormControl id="origin-lat" className="d-inline-flex" placeholder="lat." aria-label="Lat." />
                                        </Col>
                                        <Col>
                                            <FormControl id="origin-lon" className="d-inline-flex" placeholder="lon." aria-label="Lon." />
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                        <Col lg="6">
                            <Row className="d-flex flex-column">
                                <Col className="pb-3">
                                    <div>Vehicle</div>
                                </Col>
                                <Col>
                                    <Row>
                                        <Col>
                                            <FormControl id="max-vehicle-cap" className="d-inline-flex" placeholder="capacity" aria-label="capacity" />
                                        </Col>
                                        <Col>
                                            <FormControl id="unit" className="d-inline-flex" placeholder="unit" aria-label="unit" />
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className="mb-4">
                        <Col className="p-0">
                            <OriginMap />
                        </Col>
                    </Row>
                    <Row className="d-flex justify-content-end">
                        <Col lg="8">
                            <Form.File id="custom-file" label={fileName} custom onChange={onFileSubmit} />
                        </Col>
                        <Col lg="auto">
                            <Button type="submit">Create</Button>
                        </Col>
                    </Row>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default FormSetup;

import React, { useState, useRef } from "react";
import Papa from "papaparse";
import * as GeoTypes from "../types/geo";

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

const checkCsvData = (csvData: Object) => {
    assert(csvData); // TODO
}

// TODO: abstract to module
const isContiguousUSA = (lat: Number, lon: Number) => {
    if (lat >= 19.50139 && lat <= 64.85694 && lon >= -161.75583 && lon <= -68.01197) { 
        return true; 
    } else { 
        return false; 
    }
}

const checkNum = (val: Number) => {
    assert(Number(val));
}

const checkUnit = (unit: String, data: any) => {
    assert(data[0].hasOwnProperty(unit));
}

const getVrpSolution = (data: any) => {
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
    const [originLat, setOriginLat] = useState(0.);
    const [originLon, setOriginLon] = useState(0.);
    const latRef = useRef<HTMLInputElement>(null);
    const lonRef = useRef<HTMLInputElement>(null);

    const onGeoInputUpdate = event => {
        // NOTE: limiting to contiguous usa for MVP
        // TODO: null island default?
        const lat = Number(latRef.current?.value) || 0.;
        const lon = Number(lonRef.current?.value) || 0.;

        if (isContiguousUSA(lat, lon)) {
            console.log("lat: " + lat + " lon: " + lon);
            setOriginLat(lat);
            setOriginLon(lon);
        }
    };
    
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
        
        Papa.parse(event.target[4].files[0], {
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
                                            <FormControl id="origin-lat" ref={latRef} className="d-inline-flex" placeholder="lat." aria-label="Lat." onChange={onGeoInputUpdate} autoComplete="off" />
                                        </Col>
                                        <Col>
                                            <FormControl id="origin-lon" ref={lonRef} className="d-inline-flex" placeholder="lon." aria-label="Lon." onChange={onGeoInputUpdate} autoComplete="off"/>
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
                            <OriginMap originLat={originLat} originLon={originLon} />
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

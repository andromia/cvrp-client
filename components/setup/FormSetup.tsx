import React, { useState, useRef } from "react";
import Papa from "papaparse";
import * as GeoTypes from "../types/geo";

// Bootstrap
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";
import VrpBubbleMap from "../maps/BubbleMap";
import Button from "react-bootstrap/Button";

const axios = require('axios');

const checkFileData = (data: Object) => {
    // TODO: expand on this
    if (!data[0].hasOwnProperty("latitude") || !data[0].hasOwnProperty("longitude")) {
        alert("latitude and longitude fields are required in the damand file!");
    }
}

// TODO: abstract to module
const isContiguousUSA = (lat: Number, lon: Number) => {
    if (lat >= 19.50139 && lat <= 64.85694 && lon >= -161.75583 && lon <= -68.01197) { 
        return true; 
    } else {
        return false; 
    }
}

const checkNum = (val: any) => {
    if (!isFinite(val)) {
        alert("value is not a number!");
    }
}

const checkUnit = (unit: String, data: any) => {
    if (!data[0].hasOwnProperty(unit)) {
        alert("unit entered cannot be found in the demand file!");
    }
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
    const [originLat, setOriginLat] = useState(-999.),
          [originLon, setOriginLon] = useState(-999.),
          [vehicleCap, setVehicleCap] = useState(-999),
          [vehicleUnit, setVehicleUnit] = useState(""),
          [fileName, setFileName] = useState("demand file"),
          [demandMarkers, setDemandMarkers] = useState(null);

    const latRef = useRef<HTMLInputElement>(null),
          lonRef = useRef<HTMLInputElement>(null);

    const onGeoInputUpdate = event => {
        // NOTE: limiting to contiguous usa for MVP
        // TODO: null island default? make this one html element.
        if (event.target.value == '-') {
            return;
        }

        const latInput = Number(latRef.current?.value);
        const lonInput = Number(lonRef.current?.value);

        checkNum(latInput);
        checkNum(lonInput);

        if (isContiguousUSA(latInput, lonInput)) {
            setOriginLat(latInput);
            setOriginLon(lonInput);
        }
    };
    
    const onFileUpdate = event => {
        setFileName(event.target.value.split("\\").splice(-1)[0]);

        Papa.parse(event.target.files[0], {
            header: true,
            complete: function(results) {
                checkFileData(results.data);

                setDemandMarkers(results.data);
            }
        });
    };

    const onVehicleCapUpdate = event => {
        const cap = Number(event.target.value);
        checkNum(cap);

        setVehicleCap(cap);
    }

    const onVehicleUnitUpdate = event => {
        const unit = String(event.target.value);

        setVehicleUnit(unit);
    }

    // handle api integration
    const onCreateSubmit = event => {
        event.preventDefault();

        if (originLat > 90. || originLat < -90.) {
            alert("origin latitude is invalid!");
            
            return;
        }

        if (originLon > 180. || originLon < -180.) {
            alert("origin latitude is invalid!");

            return;
        }

        if (!Number.isInteger(vehicleCap)) {
            alert("vehicle capacity is invalid!");

            return;
        }
        
        if (demandMarkers) {
            checkUnit(vehicleUnit, demandMarkers);
        } else {
            alert("demand file is invalid!");

            return;
        }

        getVrpSolution({
            origin_latitude: originLat,
            origin_longitude: originLon,
            vehicle_max_capacity_quantity: vehicleCap,
            vehicle_definitions: [], // TODO: remove this for MVP
            unit: vehicleUnit,
            demand: demandMarkers,
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
                                            <FormControl id="max-vehicle-cap" className="d-inline-flex" placeholder="capacity" aria-label="capacity" onChange={onVehicleCapUpdate} />
                                        </Col>
                                        <Col>
                                            <FormControl id="unit" className="d-inline-flex" placeholder="unit" aria-label="unit" onChange={onVehicleUnitUpdate} />
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className="mb-4">
                        <Col className="p-0">
                            <VrpBubbleMap originLat={originLat} originLon={originLon} demandMarkers={demandMarkers}/>
                        </Col>
                    </Row>
                    <Row className="d-flex justify-content-end">
                        <Col lg="8">
                            <Form.File id="custom-file" label={fileName} custom onChange={onFileUpdate} />
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

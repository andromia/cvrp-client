/**
 * Initial versions of this file will be limited strictly to
 * VRP-tidy uploads and routing outputs.
 * 
 * TODO: improve on *alert*.
 */
import React, { useState, useRef } from "react";
import Papa from "papaparse";
import * as GeoTypes from "../types/geo";
import VrpBubbleMap from "../maps/VrpBubbleMap";

// Bootstrap
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";
import * as mapUtils from "../maps/MapUtils";
import Button from "react-bootstrap/Button";


const axios = require('axios');
const defaultMarkers = [{"latitude": -999., "longitude": -999.}];
const svgHeight = 300;
const svgWidth = "100%";

const checkFileData = (data: Object) => {
    /** 
     * Form utility check for geocodes.
     * 
     * TODO: add unit data check.
     */
    if (!data[0].hasOwnProperty("latitude") || !data[0].hasOwnProperty("longitude")) {
        alert("latitude and longitude fields are required in the damand file!");
    }
}

const checkNum = (val: any) => {
    /**
     * Form utility check for numeric values.
     */
    if (!isFinite(val)) {
        alert("value is not a number!");
    }
}

const checkUnit = (unit: String, data: any) => {
    /**
     * Form utitlity check for validating that the 
     * *unit* field exists in the data provided.
     */
    if (!data[0].hasOwnProperty(unit)) {
        alert("unit entered cannot be found in the demand file!");
    }
}

const createRoutes = (oLat: number, oLon: number, demand: any, vehicles: Array<number>, stopNums: Array<number>) => {
    /**
     * Create list of objects {stops: [[oLon, oLat] ...]} where
     * origin is the first and last stop.
     * 
     * TODO: use stops for order.
     */
    let routed = {};

    for (var i = 0; i < demand.length; i++) {
        if (routed.hasOwnProperty(vehicles[i])) {
            routed[vehicles[i]].stops.push([demand[i].longitude, demand[i].latitude])
        } else {
            routed[vehicles[i]] = {
                stops: [[oLon, oLat], [demand[i].longitude, demand[i].latitude]]
            }
        }
    }

    // convert routes to list of objects
    const keys = Object.keys(routed);
    let routes = Array(keys.length);

    for (var i = 0; i < keys.length; i++) {
        let route = routed[keys[i]];
        route.stops.push([oLon, oLat]);
        routes[i] = {stops: route};
    }

    return routes;
}

const VrpSetup = () => {
    /**
     * Setup page for VRP module. 
     * 
     * Requires users to input origin, vehicle constraints,
     * and demand in the form of a csv file.
     * 
     * TODO: 
     *   - refactor for component-based modules.
     *   - refactor for component-agnostic forms.
     */

     
    const [originLat, setOriginLat] = useState(-999.),
          [originLon, setOriginLon] = useState(-999.),
          [vehicleCap, setVehicleCap] = useState(-999.9),
          [vehicleUnit, setVehicleUnit] = useState(""),
          [fileName, setFileName] = useState("demand file"),
          [demand, setDemand] = useState(defaultMarkers),
          [routes, setRoutes] = useState([{stops: []}]),
          [csvUrl, setCsvUrl] = useState("");

    // input refs used to check origin inputs dual-validity; both must be valid coordinates.
    const latRef = useRef<HTMLInputElement>(null),
          lonRef = useRef<HTMLInputElement>(null);

    const onGeoInputUpdate = event => {
        /**
         * Event handler for origin inputs.
         * 
         * TODO: after refactoring, scope of component should
         * be defined at the setup level, therefore if
         * early versions limit scope to the USA, for example,
         * that should be managed at the setup level.
         */
        if (event.target.value == '-') {
            return;
        }

        const latInput = Number(latRef.current?.value);
        const lonInput = Number(lonRef.current?.value);

        checkNum(latInput);
        checkNum(lonInput);

        setOriginLat(latInput);
        setOriginLon(lonInput);
    };
    
    const onFileUpdate = event => {
        /**
         * Event handler for file input.
         * 
         * TODO: for performance we may want to consider
         * leaving data processing to a minimum. Currently
         * this function formats csv files in array<object> JSON
         * format.
         */
        setFileName(event.target.value.split("\\").splice(-1)[0]);

        Papa.parse(event.target.files[0], {
            header: true,
            complete: function(results) {
                checkFileData(results.data);

                setDemand(results.data);
            }
        });
    };

    const onVehicleCapUpdate = event => {
        /**
         * Event handler for vehicle capacity input.
         * This field initially accepts only integers
         * since our optimization is integer-based. 
         * 
         * TODO: push integer processing/requirement
         * logic to the optimization service.
         */
        const cap = Number(event.target.value);
        checkNum(cap);

        setVehicleCap(cap);
    }

    const onVehicleUnitUpdate = event => {
        /**
         * Event handler for vehicle unit field.
         * This input declares the one unit to 
         * use as the capacity constraint for the
         * optimization model.
         * 
         * TODO: 
         *   - allow more than one unit capacity
         * constraint.
         *   - suggest selection from what isn't
         * latitude or longitude.  
         */
        const unit = String(event.target.value);

        setVehicleUnit(unit);
    }

    const onCreateSubmit = event => {
        /**
         * Event handler for setup create button. 
         * On submit, the data should be checked
         * and passed to the vrp-rpc API. 
         * 
         * TODO: while the model is running animate
         * the nodes on the map according to their 
         * clusters and completion.
         */
        event.preventDefault();

        if (!mapUtils.markerIsContiguousUsa(originLat, originLon)) {
            alert("lattitude and longitude must be within the congiuous USA!");

            return;
        }

        if (!Number.isInteger(vehicleCap)) {
            alert("vehicle capacity is invalid!");

            return;
        }
        
        if (demand != defaultMarkers) {
            checkUnit(vehicleUnit, demand);

        } else {
            alert("demand file is invalid!");

            return;
        }

        if (!mapUtils.markersAreContiguousUsa(demand)) {
            alert("demand latitudes and longitudes must be within the contiguous USA!");
        }

        // TODO: create asynchronous call
        axios.post(
            process.env.dev.VRP_RPC_URL,
            {   
                origin_latitude: originLat,
                origin_longitude: originLon,
                vehicle_max_capacity_quantity: vehicleCap,
                vehicle_definitions: [], // TODO: remove this for MVP
                unit: vehicleUnit,
                demand: demand
            }).then(function (response) {
                console.log(response);
                const routes = createRoutes(originLat, originLon, response.data.demand, response.data.vehicle_id, response.data.stop_num);
                setRoutes(routes);

                if (response.data.vehicle_id.length == 0 || response.data.stop_num.length == 0) {
                    return;
                }
        
                const data: object[] = []; 
                demand.forEach(val => data.push(Object.assign({}, val)));
        
                for (var i = 0; i < demand.length; i++) {
                    data[i]["vehicle_id"] = response.data.vehicle_id[i];
                    data[i]["stop_num"] = response.data.stop_num[i];
                }
        
                const csv = Papa.unparse(data);
                const csvData = new Blob([csv], {type: 'text/csv;charset=utf-8;'});
                const csvUrl = window.URL.createObjectURL(csvData);
            
                setCsvUrl(csvUrl);
            }).catch(function (error) {
                console.log(error);
                return error;
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
                                            <FormControl 
                                            id="origin-lat" 
                                            ref={latRef} 
                                            className="d-inline-flex" 
                                            placeholder="lat." 
                                            aria-label="Lat." 
                                            onChange={onGeoInputUpdate} 
                                            autoComplete="off" />
                                        </Col>
                                        <Col>
                                            <FormControl 
                                            id="origin-lon" 
                                            ref={lonRef} 
                                            className="d-inline-flex" 
                                            placeholder="lon." 
                                            aria-label="Lon." 
                                            onChange={onGeoInputUpdate} 
                                            autoComplete="off"/>
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
                                            <FormControl 
                                            id="max-vehicle-cap"
                                            className="d-inline-flex" 
                                            placeholder="capacity" 
                                            aria-label="capacity" 
                                            onChange={onVehicleCapUpdate} 
                                            autoComplete="off" />
                                        </Col>
                                        <Col>
                                            <FormControl 
                                            id="unit" 
                                            className="d-inline-flex" 
                                            placeholder="unit" 
                                            aria-label="unit" 
                                            onChange={onVehicleUnitUpdate} 
                                            autoComplete="off"/>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className="mb-4">
                        <Col className="p-0">
                            <svg height={svgHeight} width={svgWidth}>
                                <VrpBubbleMap 
                                originLat={originLat} 
                                originLon={originLon} 
                                demand={demand}
                                routes={routes} />
                            </svg>
                        </Col>
                    </Row>
                    <Row className="d-flex justify-content-end">
                        <style type="text/css">
                        {`
                            .download-btn {
                                background-color: #4CAF50;
                            }
                        `}
                        </style>
                        {routes.length > 0 &&
                            <a href={csvUrl}><Button className="download-btn">Download</Button></a>
                        }
                        <Col lg="8">
                            <Form.File 
                            id="custom-file" 
                            label={fileName} 
                            custom onChange={onFileUpdate} />
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

export default VrpSetup;

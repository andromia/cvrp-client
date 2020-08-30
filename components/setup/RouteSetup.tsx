/**
 * Initial versions of this file will be limited strictly to
 * VRP-tidy uploads and routing outputs.
 * 
 * TODO: 
 *   - improve on *alert*
 *   - leverage TS typing
 *   - fix <a><Button/></a> for download href with just Button
 */
import React, { useState, useRef, useEffect } from "react";
import Papa from "papaparse";
import VrpBubbleMap from "../maps/VrpBubbleMap";
import WorldAtlasJson from "../maps/MapJson";
import * as mapUtils from "../maps/MapUtils";
import * as setupUtils from "./SetupUtils";
import * as mapTypes from "../maps/MapTypes";

// Bootstrap
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const axios = require('axios');


const defaultMarkers = [{"latitude": 0., "longitude": 0.}];

const RouteSetup = () => {
    /**
     * Setup page for VRP module. 
     * 
     * Requires users to input origin, vehicle constraints,
     * and demand in the form of a csv file.
     */
    const svgContainerRef = useRef<HTMLDivElement>(null),
          svgHeight: number = 350,
          atlasJson = WorldAtlasJson(),
          [svgWidth, setSvgWidth] = useState<any>(null),
          [originLat, setOriginLat] = useState<number>(0.),
          [originLon, setOriginLon] = useState<number>(0.),
          [vehicleCap, setVehicleCap] = useState<number>(0),
          [vehicleUnit, setVehicleUnit] = useState<string>(""),
          [fileName, setFileName] = useState("demand file"),
          [demand, setDemand] = useState<Array<mapTypes.CoordinateMarker>>(defaultMarkers),
          [routes, setRoutes] = useState<Array<number>>(Array(0)),
          [csvUrl, setCsvUrl] = useState<string>("");

    // input refs used to check origin inputs dual-validity; both must be valid coordinates.
    const latRef = useRef<HTMLInputElement>(null),
          lonRef = useRef<HTMLInputElement>(null);

    const handleSvgWidth = () => {
        /**
         * Get current width of div containing rendered SVG and 
         * set svg width state.
         */
        if (!svgContainerRef) {
            return;
        }
        
        if (svgContainerRef.current) {
            setSvgWidth(svgContainerRef.current.offsetWidth);
        }
    }

    const onOriginInputUpdate = event => {
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

        setupUtils.checkNum(latInput);
        setupUtils.checkNum(lonInput);

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
                setupUtils.checkFileData(results.data);

                for (var i = 0; i < results.data.length; i++) {
                    results.data[i].quantity = parseInt(results.data[i][vehicleUnit]);
                    results.data[i].id = i;
                }
                
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

        if (!Number.isInteger(parseInt(event.target.value))) {
            setVehicleCap(0);
            return;
        }

        const cap = Number(event.target.value);
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

    const prepareDownload = (parsedVehicles: Array<number>, parsedStops: Array<number>) => {
        /**
         * Create client-side prepared csv download by href.
         */
        if (parsedVehicles.length == 0 || parsedStops.length == 0) {
            return;
        }

        const data: object[] = []; 
        demand.forEach(val => data.push(Object.assign({}, val)));

        for (var i = 0; i < demand.length; i++) {
            data[i]["vehicle_id"] = parsedVehicles[i];
            data[i]["stop_number"] = parsedStops[i];
        }

        const csv = Papa.unparse(data);
        const csvData = new Blob([csv], {type: 'text/csv;charset=utf-8;'});
        const csvUrl = window.URL.createObjectURL(csvData);
    
        setCsvUrl(csvUrl);
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

        if (!Number.isInteger(vehicleCap) || vehicleCap <= 0) {
            alert("vehicle capacity is invalid!");

            return;
        }
        
        if (demand != defaultMarkers) {
            setupUtils.checkUnit(vehicleUnit, demand);

        } else {
            alert("demand file is invalid!");

            return;
        }

        if (!mapUtils.markersAreContiguousUsa(demand)) {
            alert("demand latitudes and longitudes must be within the contiguous USA!");
        }

        // TODO: create asynchronous call
        axios.post(
            process.env.dev.ROUTE_SERVICE_URL,
            {   
                stack_id: 0, // NOTE: for MVP stack_id is hardcoded
                origin: {
                    id: 0, // NOTE: for MVP origin.id is hardcoded
                    latitude: originLat,
                    longitude: originLon
                },
                vehicle_capacity: vehicleCap,
                vehicle_definitions: [], // TODO: remove this for MVP
                unit: vehicleUnit,
                demand: demand
            }).then(function (response) {
                
                const parsedVehicles: Array<number> = Array<number>(response.data.routes.length);
                const parsedStops: Array<number> = Array<number>(response.data.routes.length);
                
                for (var i = 0; i < response.data.routes.length; i++) {
                    parsedVehicles[i] = response.data.routes[i].vehicle_id;
                    parsedStops[i] = response.data.routes[i].stop_number;
                }

                const routes = setupUtils.createRoutes(originLat, originLon, demand, parsedVehicles, parsedStops);

                setRoutes(routes);
                prepareDownload(parsedVehicles, parsedStops);
            }).catch(function (error) {
                console.log(error);
                return error;
            });
    };

    useEffect(() => {
        window.addEventListener("load", handleSvgWidth);
        window.addEventListener("resize", handleSvgWidth);
    }, []);

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
                                            onChange={onOriginInputUpdate} 
                                            autoComplete="off" />
                                        </Col>
                                        <Col>
                                            <FormControl 
                                            id="origin-lon" 
                                            ref={lonRef} 
                                            className="d-inline-flex" 
                                            placeholder="lon." 
                                            aria-label="Lon." 
                                            onChange={onOriginInputUpdate} 
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
                            <div 
                            className="svg-container"
                            ref={svgContainerRef}>
                                    <VrpBubbleMap 
                                    height={svgHeight}
                                    width={svgWidth}
                                    atlasJson={atlasJson}
                                    originLat={originLat} 
                                    originLon={originLon} 
                                    demand={demand}
                                    routes={routes} />
                            </div>
                        </Col>
                    </Row>
                    <Row className="d-flex justify-content-end">
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

export default RouteSetup;

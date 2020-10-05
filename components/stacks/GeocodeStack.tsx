import React, { useState, useRef, useEffect } from "react";

import Papa from "papaparse";

import BubbleMap from "../maps/BubbleMap";
import WorldAtlasJson from "../maps/MapJson";
import * as mapTypes from "../maps/MapTypes";
import LoadingSpinner from "../common/LoadingSpinner";

// Bootstrap
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const axios = require('axios');


const svgHeight: number = 350;

const GeocodeStack = (props) => {
    /**
     * Setup page for geocode module. 
     * 
     * Requires users to input csv file containing
     * zipcodes and country abbreviations.
     */
    const atlasJson = WorldAtlasJson();
    const svgContainerRef = useRef<HTMLDivElement>(null);
    const [svgWidth, setSvgWidth] = useState<any>(null);
    const [csvUrl, setCsvUrl] = useState<string>("");
    const [destinations, setDestinations] = useState<Array<mapTypes.CoordinateMarker>>(Array<mapTypes.CoordinateMarker>(0));
    const [loading, setLoading] = useState<boolean>(false);
 
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

    if (props.inputFile.length > 0 && destinations.length == 0) {

        axios.post(
            process.env.dev.GEOCODE_SERVICE_URL,
            {stack_id: 1, zipcodes: props.inputFile} // NOTE: for MVP stack_id is hardcoded
            ).then(function (response) {
                setLoading(true); // NOTE: this does not work and probably due to how the async call is updating state/when
                
                let cleanGeocodes: Array<mapTypes.CoordinateMarker> = [];
                let nullIsland: Array<String> = [];

                for (var i = 0; i < response.data.geocodes.length; i++) {
                    if (response.data.geocodes[i].latitude == 0 && response.data.geocodes[i].longitude == 0) {
                        nullIsland.push("zipcode:" + response.data.geocodes[i].zipcode + " country: " + response.data.geocodes[i].country);
                    } else {
                        cleanGeocodes.push(response.data.geocodes[i]);
                    }
                }

                if (nullIsland.length > 0) {
                    alert("The following data failed to geocode: " + nullIsland.join(", "));
                }

                setDestinations(cleanGeocodes);
                props.setOutputFile(cleanGeocodes);
    
                const csv = Papa.unparse(cleanGeocodes);
                const csvData = new Blob([csv], {type: 'text/csv;charset=utf-8;'});
                const csvUrl = window.URL.createObjectURL(csvData);
                setCsvUrl(csvUrl);

                setLoading(false);
            }).catch(function (error) {
                console.log(error);
                setLoading(false);

                return error; // TODO: figure out if this return is necessary.
            });
    }

    useEffect(() => {
        window.addEventListener("load", handleSvgWidth);
        window.addEventListener("resize", handleSvgWidth);
    }, []);


    return (
        <Accordion defaultActiveKey="1">
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey="1">
                    <Row className="d-flex justify-content-end">
                        <Col>
                            <h4>Geocode</h4>
                        </Col>
                        <Accordion.Toggle as={Button} eventKey="1">
                            Toggle Collapse
                        </Accordion.Toggle>
                    </Row>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="1">
                    <Card.Body>
                        <Form>
                            <Row>
                                <Col className="p-0">
                                    <div 
                                    className="svg-container"
                                    ref={svgContainerRef}>
                                        <BubbleMap 
                                        height={svgHeight}
                                        width={svgWidth}
                                        atlasJson={atlasJson}
                                        origins={[]}
                                        destinations={destinations} />
                                    </div>
                                </Col>
                            </Row>
                            <Row className="d-flex justify-content-end">
                                {loading && <Button className="download-btn"><LoadingSpinner /></Button>}
                                {destinations.length > 0 &&
                                    <a href={csvUrl}><Button className="download-btn">Download</Button></a>
                                }
                            </Row>
                        </Form>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    );
};

export default GeocodeStack;

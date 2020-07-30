import React from "react";

// Bootstrap
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Search = () => {
    return (
        <Row className="d-flex justify-content-center">
            <Col lg="5">
                <FormControl className="d-inline-flex" placeholder="Search..." aria-label="Search..." disabled/>
            </Col>
            <Col lg="auto">
                <Button className="d-inline-flex" variant="primary" disabled>
                    Button 1
                </Button>
            </Col>
            <Col lg="auto">
                <Button className="d-inline-flex" variant="primary" disabled>
                    Button 2
                </Button>
            </Col>
        </Row>
    );
};

export default Search;

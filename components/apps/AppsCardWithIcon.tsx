import React from "react";

// Bootstrap
import Card from "react-bootstrap/Card";

// Components
import CardIcon from "./CardIcon";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const AppsCardWithIcon = () => {
    return (
        <Card>
            <CardIcon />
            <Card.Body>
                <Row className="d-flex justify-content-end">
                    <Col lg="10">
                        <Card.Title>Card Title</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the bulk of the card's content.
                        </Card.Text>
                        <Card.Link href="#">Card Link</Card.Link>
                        <Card.Link href="#">Another Link</Card.Link>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default AppsCardWithIcon;

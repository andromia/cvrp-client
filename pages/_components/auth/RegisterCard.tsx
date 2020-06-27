import React, { ReactElement } from "react";
import { useRouter } from "next/router";

// Bootstrap
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";

const LoginCard = (): ReactElement => {
    const router = useRouter();
    const toggleLogin = () => router.push("/auth/login");

    return (
        <>
            <Form>
                <Row className="d-flex flex-column">
                    <Col>
                        <Form.Group>
                            <Form.Label className="m-0" column="lg" htmlFor="email-input">
                                Email
                            </Form.Label>
                            <Form.Control type="email" id="email-input" size="lg" placeholder="Email" />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label className="m-0" column="lg" htmlFor="user-input">
                                Username
                            </Form.Label>
                            <Form.Control type="text" id="user-input" size="lg" placeholder="Username" />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-5">
                            <Form.Label className="m-0" column="lg" htmlFor="password-input">
                                Password
                            </Form.Label>
                            <Form.Control id="password-input" type="password" size="lg" placeholder="Password" />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Row className="btn-row-grp d-flex justify-content-between">
                            <Col className="btn-col" lg="5">
                                <Button className="w-100">Guest</Button>
                            </Col>
                            <Col className="btn-col" lg="5">
                                <Button className="w-100">Login</Button>
                            </Col>
                        </Row>
                    </Col>
                    <Col className="d-flex justify-content-around flex-column">
                        <p className="text-right my-4">
                            <span>Already have an account?</span>
                            <Button variant="link" className="pt-0" onClick={toggleLogin}>
                                Log In
                            </Button>
                        </p>
                        <hr className="w-100 mb-5" />
                    </Col>
                </Row>
            </Form>

            <Row className="d-flex flex-column">
                <Col className="mb-2">
                    <Button className="w-100">Sign up with Gmail</Button>
                </Col>
                <Col className="mb-2">
                    <Button className="w-100">Sign up with Login</Button>
                </Col>
            </Row>
        </>
    );
};

export default LoginCard;

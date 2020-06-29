import React, { ReactElement, useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";
import useSWR, { mutate } from "swr";
import axios from "axios";

// Bootstrap
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";

interface Props {
    USER_AUTH_URL: string;
    USER_CRUD_URL: string;
}

const LoginCard = (props: Props): ReactElement => {
    const [isFormSubmit, setFormSubmit] = useState({ submit: false, data: { username: "", password: "" } });
    const [envobj, setEnvObj] = useState({ USER_AUTH_URL: "", USER_CRUD_URL: "" });

    const userInputRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);

    const router = useRouter();
    const toggleRegister = () => router.push("/auth/register");

    useEffect(() => {
        if (process.env.NODE_ENV === "development") {
            if (process?.env?.dev) {
                setEnvObj({
                    USER_AUTH_URL: process.env.dev.USER_AUTH_URL,
                    USER_CRUD_URL: process.env.dev.USER_CRUD_URL
                });
            }
        } else {
            if (process?.env?.prod) {
                setEnvObj({
                    USER_AUTH_URL: process.env.prod.USER_AUTH_URL,
                    USER_CRUD_URL: process.env.prod.USER_CRUD_URL
                });
            }
        }
    }, []);

    useEffect(() => {
        if (isFormSubmit.submit) {
            const data = { username: isFormSubmit.data.username, password: isFormSubmit.data.password };
            console.log(data);
            axios.post(envobj.USER_AUTH_URL + "auth/login", data).then(res => {
                console.log(res);
            });
        }
    }, [isFormSubmit.submit]);

    const handleLogin = e => {
        e.preventDefault();
        const username = userInputRef?.current?.value || "";
        const password = passwordInputRef?.current?.value || "";
        setFormSubmit({ submit: true, data: { username, password } });
    };

    return (
        <>
            <Form onSubmit={handleLogin}>
                <Row className="d-flex flex-column">
                    <Col>
                        <Form.Group>
                            <Form.Label className="m-0" column="lg" htmlFor="user-input">
                                Username
                            </Form.Label>
                            <Form.Control type="text" id="user-input" size="lg" placeholder="Username" ref={userInputRef} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-5">
                            <Form.Label className="m-0" column="lg" htmlFor="password-input">
                                Password
                            </Form.Label>
                            <Form.Control id="password-input" type="password" size="lg" placeholder="Password" ref={passwordInputRef} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Row className="btn-row-grp d-flex justify-content-between">
                            <Col className="btn-col">
                                <Button className="w-100">Guest</Button>
                            </Col>
                            <Col className="btn-col">
                                <Button type="submit" className="w-100">
                                    Login
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                    <Col className="d-flex justify-content-around flex-column">
                        <p className="text-right my-4">
                            <span>Don&apos;t have an account?</span>
                            <Button variant="link" className="pt-0" onClick={toggleRegister}>
                                Sign Up
                            </Button>
                        </p>
                        <hr className="w-100 mb-5" />
                    </Col>
                </Row>
            </Form>

            <Row className="d-flex flex-column">
                <Col className="mb-2">
                    <Button className="w-100">Sign in with Gmail</Button>
                </Col>
                <Col className="mb-2">
                    <Button className="w-100">Sign in with Login</Button>
                </Col>
            </Row>
        </>
    );
};

export default LoginCard;

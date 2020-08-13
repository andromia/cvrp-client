import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";


const CustomNav = () => {

    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/">solverstack</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                <Nav.Link href="/apps/example-user">Profile</Nav.Link>
                <NavDropdown title="More" id="basic-nav-dropdown">
                    <NavDropdown.Item href="/auth/login">Login</NavDropdown.Item>
                    <NavDropdown.Item href="/auth/register">Register</NavDropdown.Item>
                    <NavDropdown.Item href="#action/trending">Trending</NavDropdown.Item>
                    <NavDropdown.Item href="#action/discover">Discover</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/create">Create</NavDropdown.Item>
                </NavDropdown>
                </Nav>
                <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-success">Search</Button>
                </Form>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default CustomNav;

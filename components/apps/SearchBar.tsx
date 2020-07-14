import React from "react";

// Bootstrap
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";

const SearchBar = () => {
    return (
        <InputGroup className="mb-3">
            <FormControl placeholder="Search for an app" aria-label="Search for an app" aria-describedby="basic-addon2" size={"lg"} />
            <InputGroup.Append>
                <Button variant="outline-secondary">Search</Button>
            </InputGroup.Append>
        </InputGroup>
    );
};

export default SearchBar;

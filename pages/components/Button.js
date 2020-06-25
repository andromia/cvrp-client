import { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "react-bootstrap/Button";

const CustomBtn = styled(Button)`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.primary};
`;

export default function CustomButton({ type }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const fetchData = async () => {
    try {
      console.log("1");
      const req = await fetch("localhost:8080");
      console.log(req);
      const newData = await req.json();
      return setData(newData);
    } catch (e) {
      console.log(e);
    }

    try {
      console.log("2");
      const req = await fetch("node_auth:8080");
      console.log(req);
      const newData = await req.json();
      return setData(newData);
    } catch (e) {
      console.log(e);
    }

    try {
      console.log("3");
      const req = await fetch("node_auth");
      console.log(req);
      const newData = await req.json();
      return setData(newData);
    } catch (e) {
      console.log(e);
    }
  };

  const handleClick = (event) => {
    event.preventDefault();
    console.log("CLICKED!");
    fetchData();
  };

  return (
    <div>
      <CustomBtn className="my-5" onClick={handleClick}>
        {type === "auth" ? "USER AUTH" : "USER CRUD"}
      </CustomBtn>
    </div>
  );
}

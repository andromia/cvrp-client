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
    const req = await fetch(
      type === "auth" ? process.env.userAuth : process.env.userCrud
    );
    const newData = await req.json();
    return setData(newData);
  };

  const handleClick = (event) => {
    event.preventDefault();
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

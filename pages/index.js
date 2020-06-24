import Head from "next/head";
import styled from "styled-components";
import Button from "react-bootstrap/Button";

const CustomBtn = styled(Button)`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.primary};
`;

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div>
          <h1>Main content</h1>
          <CustomBtn className="hello-world-btn">Hello World</CustomBtn>
        </div>
      </main>

      <footer>
        <div>Wow, a footer component</div>
      </footer>
    </div>
  );
}

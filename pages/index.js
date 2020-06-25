import Head from "next/head";

import CustomBtn from "./components/Button";

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
          <CustomBtn type="auth" />
          <CustomBtn type="crud" />
        </div>
      </main>

      <footer>
        <div>Wow, a footer component</div>
      </footer>
    </div>
  );
}

import React from "react";
import Head from "next/head";

import CustomBtn from "./_components/Button";

const Home: React.FunctionComponent = (props: any) => {
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
                    <CustomBtn type="" />
                </div>
            </main>

            <footer>
                <div>Wow, a footer component</div>
            </footer>
        </div>
    );
};

export default Home;

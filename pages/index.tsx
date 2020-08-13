import React from "react";
import Head from "next/head";

import CustomNav from "../components/common/CustomNav";


const Home: React.FunctionComponent = (props: any) => {
    return (
        <div className="container">
            <Head>
                <title>solverstack</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <CustomNav />

            <main>
                <div>
                    <h1>Welcome!</h1>
                </div>
            </main>
        </div>
    );
};

export default Home;

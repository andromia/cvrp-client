import React, { ReactElement } from "react";

// Components
import MiddleContainer from "../_components/styled-common/MiddleContainer";
import AuthCardContainer from "../_components/auth/AuthCardContainer";
import LoginCard from "../_components/auth/LoginCard";

const Login = (): ReactElement => {
    return (
        <MiddleContainer>
            <AuthCardContainer>
                <LoginCard />
            </AuthCardContainer>
        </MiddleContainer>
    );
};

export default Login;

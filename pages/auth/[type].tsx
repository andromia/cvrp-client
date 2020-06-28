import React, { ReactElement } from "react";
import { useRouter } from "next/router";

// Components
import MiddleContainer from "../_components/styled-common/MiddleContainer";
import AuthCardContainer from "../_components/auth/AuthCardContainer";
import LoginCard from "../_components/auth/LoginCard";
import RegisterCard from "../_components/auth/RegisterCard";

const Login = (): ReactElement => {
    const router = useRouter();
    const { type } = router.query;

    return (
        <MiddleContainer>
            <AuthCardContainer>
                {type === "login" && <LoginCard />}
                {type === "register" && <RegisterCard />}
            </AuthCardContainer>
        </MiddleContainer>
    );
};

export default Login;

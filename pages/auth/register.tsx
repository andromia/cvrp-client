import React, { ReactElement } from "react";

// Components
import MiddleContainer from "../_components/styled-common/MiddleContainer";
import AuthCardContainer from "../_components/auth/AuthCardContainer";
import RegisterCard from "../_components/auth/RegisterCard";

const Register = (): ReactElement => {
    return (
        <MiddleContainer>
            <AuthCardContainer>
                <RegisterCard />
            </AuthCardContainer>
        </MiddleContainer>
    );
};

export default Register;

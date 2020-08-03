import styled from "styled-components";

const StyledContainer = styled.div`
    @media (min-width: 1100px) {
        height: 100vh;
    }

    @media (max-width: 1099px) {
        height: 100%;
    }

    display: flex;
    width: 100%;
    align-items: ${props => (props.middle ? "center" : "")};

    .svg-container {
        display: inline-block;
        position: relative;
        width: 100%;
        padding-bottom: 100%;
        vertical-align: top;
        overflow: hidden;
    }
    .svg-content {
        display: inline-block;
        position: absolute;
        top: 0;
        left: 0;
    }
    
`;

export default StyledContainer;

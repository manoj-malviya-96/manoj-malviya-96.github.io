import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const RoutableComponent = ({ Component, ...children }) => {
    const navigate = useNavigate();
    const params = useParams();

    return <Component navigate={navigate} params={params} {...children} />;
};

export default RoutableComponent;

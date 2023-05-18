import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ element: Component, ...rest }) => {
	const { token } = useSelector((state) => state.auth);

	return <>{token ? <Outlet /> : <Navigate to="/login" />};</>;
};

export default PrivateRoute;

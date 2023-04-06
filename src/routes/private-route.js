import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import MainContainer from "../container";
import { getOfflineData } from "../utils/offline-services";

const PrivateRoute = () => {
  return getOfflineData("user") ? (
    <MainContainer>
      <Outlet />
    </MainContainer>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;

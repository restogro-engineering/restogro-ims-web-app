import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./private-route";
import { Login } from "../components/login";
import LandingPage from "../components/Landling Page";
const AppRoutes = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/" element={<PrivateRoute />}>
            <Route exact path="/" element={<LandingPage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default AppRoutes;

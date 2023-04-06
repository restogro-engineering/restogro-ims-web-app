import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import "./index.scss";
import { invokeApi, HTTP_METHODS } from "../../utils/http-service";
import { HOSTNAME, REST_URLS } from "../../utils/endpoints";
import { setOfflineData, getOfflineData } from "../../utils/offline-services";
import { toast } from "react-toastify";
import { BellCorpStudioLogoContainer } from "../Bellcorp-Studio-Logo";

export const Login = () => {
  const navigate = useNavigate();
  const [loginDetails, setLoginDetails] = useState({});
  useEffect(() => {
    const user = getOfflineData("user");
    if (user) {
      let navigateToRoute = "/";
      navigate(navigateToRoute);
    }
  }, [navigate]);

  const onInputChange = (event) => {
    setLoginDetails({
      ...loginDetails,
      [event.target.name]: event.target.value,
    });
  };
  const login = () => {
    let payload = {
      email: loginDetails.email,
      password: loginDetails.password,
    };

    invokeApi(HTTP_METHODS.POST, `${HOSTNAME}${REST_URLS.LOGIN}`, payload).then(
      (response) => {
        if (response.message) {
          toast.error(response.message, { autoClose: 2000 });
          setLoginDetails({
            ...loginDetails,
            errorMsg: response.message,
          });
        } else {
          response.user && setOfflineData("user", response.user);
          response.tokens && setOfflineData("tokens", response.tokens);
          let navigateToRoute = "/";
          navigate(navigateToRoute);
        }
      }
    );
  };

  return (
    <div className="login-container">
      <div className="left">
        <img src={require("../../resources/info.png")} />
      </div>
      <div className="right">
        <div className="login-form">
          <div className="title">Login</div>
          <TextField
            size="small"
            label="Email"
            name="email"
            value={loginDetails.email}
            onChange={onInputChange}
          />
          <TextField
            size="small"
            label="Password"
            type="password"
            name="password"
            value={loginDetails.password}
            onChange={onInputChange}
          />
          <Button
            variant="contained"
            color={
              !loginDetails.email || !loginDetails.password
                ? "inherit"
                : "primary"
            }
            onClick={login}
            disabled={!loginDetails.email || !loginDetails.password}
          >
            Login
          </Button>
          {/* <Button
            variant="text"
            color="primary"
            onClick={() => {
              navigate("/register");
            }}
          >
            Register
          </Button> */}
          {loginDetails.errorMsg && (
            <span className="error-msg">{loginDetails.errorMsg}</span>
          )}
        </div>
        <BellCorpStudioLogoContainer />
      </div>
    </div>
  );
};

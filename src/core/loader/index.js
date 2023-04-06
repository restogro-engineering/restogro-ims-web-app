import React from "react";
import { usePromiseTracker } from "react-promise-tracker";
import "./index.scss";
import CircularProgress from "@mui/material/CircularProgress";

const Loader = () => {
  const { promiseInProgress } = usePromiseTracker();
  return (
    promiseInProgress && (
      <div className="loading-indicator">
        <div className="spinner-container ">
          <CircularProgress />
        </div>
      </div>
    )
  );
};

export default Loader;

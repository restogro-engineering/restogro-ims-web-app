import React from "react";
import { ToastContainer } from "react-toastify";
import AppRoutes from "./routes";
import { Theme } from "./utils/theme-config";
import Loader from "./core/loader";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AppProvide } from "./utils/context";
import "react-toastify/dist/ReactToastify.css";
import "./styles/index.scss";
const theme = createTheme(Theme);
function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Loader />
        <ToastContainer autoClose={8000} />
        <AppProvide>
          <AppRoutes />
        </AppProvide>
      </ThemeProvider>
    </div>
  );
}

export default App;

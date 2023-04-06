import SideMenu from "../core/side-menu";
import "./index.scss";
import { useState, useEffect } from "react";
import MenuIcon from "@material-ui/icons/Menu";
import MenuOpenIcon from "@material-ui/icons/MenuOpen";
import { styled } from "@material-ui/styles";
import { IconButton } from "@material-ui/core";
import { BellCorpStudioLogoContainer } from "../components/Bellcorp-Studio-Logo";
import Header from "../core/header";

const MainContainer = ({
  children,
}) => {
  return (
    <>
      <div className="main-container">
        <div className="main-right-container">
          <Header />
          <div className="content-div">
            <div>{children}</div>
            <BellCorpStudioLogoContainer />
          </div>
        </div>
      </div>
    </>
  );
};

export default MainContainer;

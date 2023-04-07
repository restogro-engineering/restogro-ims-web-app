import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Menu, MenuItem, ListItemIcon } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Logout from "@mui/icons-material/Logout";
import "./index.scss";
import logo from "../../resources/images/logo.png";
import { clearOfflineData, getOfflineData } from "../../utils/offline-services";
import SideMenu from "../side-menu";
import { HTTP_METHODS, invokeApi } from "../../utils/http-service";
import { HOSTNAME, REST_URLS } from "../../utils/endpoints";
const Header = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    let user = getOfflineData("user");
    setUserDetails(user);
  }, []);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    const refreshToken = getOfflineData("tokens")?.refresh?.token || "";
    invokeApi(HTTP_METHODS.POST, `${HOSTNAME}${REST_URLS.LOGOUT}`, {
      refreshToken,
    })
      .then(() => {
        clearOfflineData("user");
        clearOfflineData("tokens");
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
        clearOfflineData("user");
        clearOfflineData("tokens");
        navigate("/login");
      });
  };
  return (
    <div className="header-container">
      <div className="logo-con">
        <SideMenu />
        <img className="logo" src={logo} />
      </div>
      <div className="endLoginContainer">
        <div className="menu">
          <Avatar>
            <AccountCircleIcon />
          </Avatar>
          <Button
            type="small"
            variant="text"
            onClick={(event) => setAnchorEl(event.currentTarget)}
            endIcon={<KeyboardArrowDownIcon />}
          >
            {userDetails.name}
          </Button>

          <Menu
            anchorEl={anchorEl}
            open={!!anchorEl}
            onClose={handleClose}
            onClick={handleClose}
          >
            <MenuItem onClick={logout}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default Header;

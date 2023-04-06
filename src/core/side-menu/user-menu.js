import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Menu, MenuItem, ListItemIcon } from "@material-ui/core";
import Avatar from "@mui/material/Avatar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Logout from "@mui/icons-material/Logout";
import "./index.scss";
import { clearOfflineData, getOfflineData } from "../../utils/offline-services";
import { HTTP_METHODS, invokeApi } from "../../utils/http-service";
import { HOSTNAME, REST_URLS } from "../../utils/endpoints";
const UserMenu = ({ isOpen }) => {
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
      .then((res) => {
        clearOfflineData("user");
        navigate("/login");
      })
      .catch((err) => {
        clearOfflineData("user");
        navigate("/login");
        console.log(err);
      });
  };
  return (
    <div
      style={{ padding: isOpen ? "5px 0px 5px 20px" : "0px" }}
      className="user-menu-container"
    >
      <Avatar>
        <AccountCircleIcon />
      </Avatar>
      <Button
        type="small"
        variant="text"
        onClick={(event) => setAnchorEl(event.currentTarget)}
        endIcon={<KeyboardArrowDownIcon color="light" />}
      >
        <span
          style={{
            color: "#fff",
            maxWidth: "80px",
          }}
        >
          {userDetails.name}
        </span>
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
          <span>Logout</span>
        </MenuItem>
      </Menu>
    </div>
  );
};
export default UserMenu;

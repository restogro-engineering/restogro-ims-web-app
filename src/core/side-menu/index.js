/** @format */

import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import "./index.scss";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";
import { SIDE_MENU } from "./config";

export default function SideMenu() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [menuItems, setMenuItems] = React.useState([]);
  const [activeMenu, setActiveMenu] = React.useState("/");
  React.useEffect(() => {
    const list = SIDE_MENU();
    setMenuItems(list);
  }, []);
  React.useEffect(() => {
    setActiveMenu(
      menuItems.find((m) => m.url === window.location.pathname) || {}
    );
  }, [menuItems]);
  const onMenuClick = () => {};

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={() => setOpen(!open)}
      onKeyDown={() => setOpen(!open)}
    >
      <List>
        <div className="side-menu-header">
          <img src={require("../../resources/images/logo.png")} width="80%" />
          <IconButton onClick={() => setOpen(!open)}>
            <ArrowBackIosNewIcon />
          </IconButton>
        </div>
        <div className="menu-items">
          {menuItems.map((menu, index) => {
            let showMenuOption = true;
            return (
              <>
                {
                  <div
                    key={menu.value}
                    className={
                      menu.value === activeMenu.value
                        ? "menu-item menu-item-active"
                        : "menu-item"
                    }
                    onClick={() => {
                      onMenuClick();
                      setActiveMenu(menu);
                      navigate(menu.url);
                    }}
                  >
                    <div className="menu-name align-center">
                      <span>{menu.logo}</span>
                      <span className="sidebarmenulabel">{menu.label}</span>
                    </div>
                  </div>
                }
              </>
            );
          })}
        </div>
      </List>
    </Box>
  );

  return (
    <div>
      <IconButton onClick={() => setOpen(!open)}>
        {open ? <MenuOpenIcon /> : <MenuIcon />}
      </IconButton>
      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        {list("left")}
      </Drawer>
    </div>
  );
}

import React, { useState } from "react";
import style from "./Navbar.module.css";
import { Button, Menu, MenuItem } from "@mui/material";
import profile from "../../Assets/Image/Profile.svg";
import logo from "../../Assets/Image/logo.png";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const key = localStorage.getItem("key");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className={style.navbarMain}>
      <img src={logo} width="15%" height={40} style={{ margin: "10px" }} />
      <Button
        id="fade-button"
        sx={{
          backgroundColor: "transparent",
          ":hover": {
            backgroundColor: "transparent",
          },
          borderRadius: "100%",
          width: 35,
          height: 35,
          padding: 0,
        }}
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={(e) => {
          handleClick(e);
        }}
      >
        <img src={profile} width={35} height={35} />
      </Button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={() => {
          handleClose();
        }}
        // TransitionComponent={Fade}
      >
        <MenuItem
          onClick={() => {
            handleClose();
          }}
        >
          Profile
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigate("/");
            handleClose();
          }}
        >
          Form
        </MenuItem>
        <MenuItem
          onClick={() => {
            localStorage.clear();
            navigate("/login");
            handleClose();
          }}
        >
          {key ? "Logout" : "Login"}
        </MenuItem>
      </Menu>
    </div>
  );
};

export default Navbar;

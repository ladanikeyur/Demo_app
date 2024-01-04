import React, { useState } from "react";
import style from "./Navbar.module.css";
import { Button, IconButton, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import toggle from "../../../Assets/Image/toggle.svg";
import { useDispatch, useSelector } from "react-redux";
import { changeStap } from "../../../Redux/Slice/FormSlice";

const Navbar = ({ onClickMenu, sideBar }) => {
  const key = localStorage.getItem("key");
  const [anchorEl, setAnchorEl] = useState(null);
  const form = useSelector((state) => state.form);
  const dispatch = useDispatch();
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
      <IconButton
        onClick={() => {
          dispatch(changeStap(form?.formStap === 0 ? 0 : form?.formStap - 1));
          // onClickMenu();
        }}
      >
        <img src={toggle} alt="toggle" />
      </IconButton>

      {key ? (
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
          <img
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            alt="img"
            width={35}
            height={35}
            className={style.ProfileImage}
          />
        </Button>
      ) : (
        <button
          className={`btn btn-light ${style.loginButton}`}
          onClick={() => {
            navigate("/login");
          }}
        >
          Login
        </button>
      )}

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
          My Project
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
        {/* <MenuItem
          onClick={() => {
            navigate("/");
            handleClose();
          }}
        >
          Pricing Page
        </MenuItem> */}
      </Menu>
    </div>
  );
};

export default Navbar;

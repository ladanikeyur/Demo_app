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
            src="https://img.freepik.com/free-photo/young-woman-with-round-glasses-yellow-sweater_273609-7091.jpg?w=740&t=st=1704289925~exp=1704290525~hmac=ca4fbd424c864b8eeccf13e9cc1e508ea4d06ca1635bdf0122a1b19c46203376"
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

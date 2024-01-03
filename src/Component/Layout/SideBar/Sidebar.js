import React from "react";
import style from "./Sidebar.module.css";
import logo from "../../../Assets/Image/logo.png";
import { useNavigate } from "react-router-dom";

export default function Sidebar({ sideBar }) {
  const navigate = useNavigate();
  return (
    <div className={sideBar ? style.mainSidebar : style.mainSidebarClose}>
      <img
        src={logo}
        alt="img"
        width={130}
        // height={40}
        style={{ margin: "10px" }}
      />
      <div className={style.sidebarMenu}>
        <div
          onClick={() => {
            navigate("/");
          }}
          className={style.SidbarMenuItem}
        >
          <span className={style.menuLabel}>Studio</span>
        </div>
        <div className={style.SidbarMenuItem}>
          <span className={style.menuLabel}>My Projects</span>
        </div>

        <div className={style.SidbarMenuItem}>
          <span className={style.menuLabel}>Build Team</span>
        </div>
        <div className={style.SidbarMenuItem}>
          <span className={style.menuLabel}>Upgrade</span>
        </div>
        <div
          onClick={() => {
            window.open("mailto:hello@victo.ai", "_blank");
          }}
          className={style.SidbarMenuItem}
        >
          <span className={style.menuLabel}>Support</span>
        </div>
        <div className={style.SidbarMenuItem}>
          <span className={style.menuLabel}>Documentation</span>
        </div>
        <div className={style.SidbarMenuItem}>
          <span className={style.menuLabel}>Setting</span>
        </div>
        <div className={style.SidbarMenuItem}>
          <span className={style.menuLabel}>Logout</span>
        </div>
      </div>
    </div>
  );
}

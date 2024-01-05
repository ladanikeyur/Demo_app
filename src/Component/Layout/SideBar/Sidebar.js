import React from "react";
import style from "./Sidebar.module.css";
import logo from "../../../Assets/Image/logo.png";
import whatsApp from "../../../Assets/Image/whatsApp.svg";
import Instagram from "../../../Assets/Image/Instagram.svg";
import Linkdin from "../../../Assets/Image/Linkdin.svg";
import Twiter from "../../../Assets/Image/Twiter.svg";
import { useNavigate } from "react-router-dom";

export default function Sidebar({ sideBar }) {
  const navigate = useNavigate();
  const key = localStorage.getItem("key");
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
            localStorage.removeItem("projectid");
          }}
          className={style.SidbarMenuItem}
        >
          <span className={style.menuLabel}>Studio</span>
        </div>
        {key ? (
          <div
            className={style.SidbarMenuItem}
            onClick={() => {
              navigate("/report/myproject");
            }}
          >
            <span className={style.menuLabel}>My Projects</span>
          </div>
        ) : null}
        {key ? (
          <div
            className={style.SidbarMenuItem}
            onClick={() => {
              navigate("/report/myprofile");
            }}
          >
            <span className={style.menuLabel}>My Profile</span>
          </div>
        ) : null}
        <div className={style.SidbarMenuItem}>
          <span
            className={style.menuLabel}
            onClick={() => {
              window.open(
                "https://04wgvsbr8g8.typeform.com/to/ihwcRFWBˇ",
                "_blank"
              );
            }}
          >
            Build Team
          </span>
        </div>
        {/* <div className={style.SidbarMenuItem}>
          <span className={style.menuLabel}>Upgrade</span>
        </div> */}
        <div
          onClick={() => {
            window.open("mailto:hello@victo.ai", "_blank");
          }}
          className={style.SidbarMenuItem}
        >
          <span className={style.menuLabel}>Support</span>
        </div>
        {/* <div className={style.SidbarMenuItem}>
          <span className={style.menuLabel}>Documentation</span>
        </div> */}
        {/* <div className={style.SidbarMenuItem}>
          <span className={style.menuLabel}>Setting</span>
        </div> */}
        <div
          className={style.SidbarMenuItem}
          onClick={() => {
            localStorage.clear();
            navigate("/login");
          }}
        >
          <span className={style.menuLabel}>{key ? "Logout" : "Login"}</span>
        </div>
      </div>
      <div className={style.bottomBox}>
        <button
          className={style.BookDemo}
          onClick={() => {
            window.open("https://calendly.com/hello-oe/30min", "_blank");
          }}
        >
          Book a Demo
        </button>
        <div className={style.contactMenu}>
          <button
            className={style.socialIcon}
            onClick={() => {
              window.open("https://nas.io/Victo_AI", "_blank");
            }}
          >
            <img src={whatsApp} alt="whatsApp" />
          </button>
          <button
            className={style.socialIcon}
            onClick={() => {
              window.open("https://www.instagram.com/victo_ai/", "_blank");
            }}
          >
            <img src={Instagram} alt="Instagram" />
          </button>
          <button
            className={style.socialIcon}
            onClick={() => {
              window.open(
                "https://www.linkedin.com/company/victoai/",
                "_blank"
              );
            }}
          >
            <img src={Linkdin} alt="Linkdin" />
          </button>
          <button
            className={style.socialIcon}
            onClick={() => {
              window.open("https://twitter.com/Victo_AI", "_blank");
            }}
          >
            <img src={Twiter} alt="Twiter" />
          </button>
        </div>
      </div>
    </div>
  );
}

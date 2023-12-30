import { Box, Card } from "@mui/material";
import React, { useState } from "react";
import style from "./Registration.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../utils";

export default function Registration() {
  const [userDetail, setUserDetail] = useState({
    userName: "",
    password: "",
  });
  const navigation = useNavigate();

  const hendleuserRagistor = () => {
    // navigation("/otp");
    axios
      .get(`${API_URL}/auth/signup/keyurpatl5943@gmail.com`, {
        username: userDetail?.userName,
        password: userDetail?.password,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log("error", err);
      });
    console.log(userDetail);
  };

  return (
    <div className={style?.main}>
      <div className={`card ${style?.loginform}`}>
        <h4 className="text-center">User Registration</h4>
        <br />
        <input
          type="email"
          onChange={(e) => {
            setUserDetail({ ...userDetail, userName: e.target.value });
          }}
          placeholder="Email"
          className="form-control"
        />
        <br />
        <input
          className="form-control"
          onChange={(e) => {
            setUserDetail({ ...userDetail, password: e.target.value });
          }}
          type="password"
          placeholder="Password"
        />
        <br />
        <button
          className="btn btn-primary"
          onClick={() => {
            hendleuserRagistor();
          }}
        >
          Registration
        </button>
        <button
          className={`${style.Registration}`}
          onClick={() => {
            navigation("/");
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import style from "./Login.module.css";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [userAuth, setUserAuth] = useState({
    userName: "",
    password: "",
  });
  const navigation = useNavigate();

  const hendleuserLogin = () => {
    navigation("/otp");
    console.log("userAuth", userAuth);
  };
  return (
    <div className={style?.main}>
      <div className={`card ${style?.loginform}`}>
        <h4 className="text-center">Login</h4>
        <br />
        <input
          type="email"
          onChange={(e) => {
            setUserAuth({ ...userAuth, userName: e.target.value });
          }}
          placeholder="Email"
          className="form-control"
        />
        <br />
        <input
          onChange={(e) => {
            setUserAuth({ ...userAuth, password: e.target.value });
          }}
          className="form-control"
          type="password"
          placeholder="Password"
        />
        <br />
        <button
          className="btn btn-primary"
          onClick={() => {
            hendleuserLogin();
          }}
        >
          Login
        </button>
        <button
          className={`${style.Registration}`}
          onClick={() => {
            navigation("/Registration");
          }}
        >
          Registration
        </button>
      </div>
    </div>
  );
}

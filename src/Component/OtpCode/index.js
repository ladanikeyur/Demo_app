import { Box, Card } from "@mui/material";
import React, { useState } from "react";
import style from "./OtpCode.module.css";
import { useNavigate } from "react-router-dom";

export default function OtpCode() {
  const [userAuthOtp, setUserAuthOtp] = useState(null);
  const navigation = useNavigate();

  const hendleuserOtpVerify = () => {
    navigation("/tab");
    console.log("userAuth", userAuthOtp);
  };
  return (
    <div className={style?.main}>
      <div className={`card ${style?.loginform}`}>
        <h4 className="text-center">OTP Verify</h4>
        <br />
        <input
          type="number"
          value={userAuthOtp}
          onChange={(e) => {
            setUserAuthOtp(e.target.value);
          }}
          placeholder="OTP"
          className="form-control"
        />
        <br />
        <button
          className="btn btn-primary"
          onClick={() => {
            hendleuserOtpVerify();
          }}
        >
          Verify
        </button>
        {/* <button
          className={`${style.Registration}`}
          onClick={() => {
            navigation("/Registration");
          }}
        >
          Registration
        </button> */}
      </div>
    </div>
  );
}

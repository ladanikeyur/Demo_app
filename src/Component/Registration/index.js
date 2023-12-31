import React, { useState } from "react";
import style from "./Registration.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { NotificationManager } from "react-notifications";
import { Box, CircularProgress } from "@mui/material";
import { API_URL } from "../../utils";

export default function Registration() {
  const [userDetail, setUserDetail] = useState({
    userName: "",
  });
  const [submit, setSubmit] = useState(false);
  const [loader, setLoader] = useState(false);
  const navigation = useNavigate();

  // const validateEmail = (email) => {
  //   return email.match(
  //     /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  //   );
  // };

  const hendleuserRagistor = () => {
    setSubmit(true);
    if (userDetail.userName !== "") {
      if (
        /^[-0-9a-zA-Z.+_]+@[-0-9a-zA-Z.+_]+.[a-zA-Z]{2,}$/.test(
          String(userDetail.userName)
        )
      ) {
        setLoader(true);
        axios
          .get(`${API_URL}auth/signup/${userDetail?.userName}`)
          .then((res) => {
            if (res?.data?.passhash) {
              localStorage.setItem("user", JSON.stringify(res?.data));
              NotificationManager.success("OTP send Successfuly");
              navigation("/otp", { state: { type: "signup" } });
              setLoader(false);
            } else {
              NotificationManager.error(res?.data);
              setLoader(false);
            }
          })
          .catch((err) => {
            NotificationManager.error(err);
            setLoader(false);
          });
      } else {
        NotificationManager.error("Please Enter valid Email");
      }
    }
  };

  return (
    <div className={style?.main}>
      <div className={`card ${style?.loginform}`}>
        <h4 className="text-center">User Registration</h4>
        <br />
        <input
          type="email"
          onChange={(e) => {
            setUserDetail({ userName: e.target.value });
          }}
          placeholder="Email"
          className="form-control"
        />
        {submit === true && userDetail.userName === "" ? (
          <small className={style.error}>Please Enter Your Email</small>
        ) : null}
        <br />
        <button
          className="btn btn-primary"
          onClick={() => {
            hendleuserRagistor();
          }}
        >
          {loader ? (
            <Box
              sx={{
                margin: "auto",
                display: "block",
              }}
            >
              <CircularProgress size={15} color="inherit" />
              &nbsp; Please Wait
            </Box>
          ) : (
            "Registration"
          )}
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

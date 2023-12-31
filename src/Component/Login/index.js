import React, { useState } from "react";
import style from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { NotificationManager } from "react-notifications";
import { Box, CircularProgress } from "@mui/material";

export default function Login() {
  const [userAuth, setUserAuth] = useState({
    userName: "",
  });
  const [loader, setLoader] = useState(false);
  const [submit, setSubmit] = useState(false);
  const navigation = useNavigate();

  // const validateEmail = (email) => {
  //   return email.match(
  //     /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  //   );
  // };

  const hendleuserLogin = () => {
    setSubmit(true);
    if (userAuth.userName !== "") {
      if (
        /^[\-0-9a-zA-Z\.\+_]+@[\-0-9a-zA-Z\.\+_]+\.[a-zA-Z]{2,}$/.test(
          String(userAuth.userName)
        )
      ) {
        setLoader(true);
        axios
          .get(`http://api.victo.ai/auth/login/${userAuth?.userName}`)
          .then((res) => {
            if (res?.data?.passhash) {
              localStorage.setItem("user", JSON.stringify(res?.data));
              NotificationManager.success("OTP send Successfuly");
              navigation("/otp", { state: { type: "login" } });
              setUserAuth({ userName: "" });
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
        <h4 className="text-center">Login</h4>
        <br />
        <input
          type="email"
          value={userAuth.userName}
          onChange={(e) => {
            setUserAuth({ userName: e.target.value });
          }}
          placeholder="Email"
          className="form-control"
        />
        {submit === true && userAuth.userName === "" ? (
          <small className={style.error}>Please Enter Your Email</small>
        ) : null}
        <br />

        <button
          className="btn btn-primary"
          disabled={loader}
          onClick={() => {
            hendleuserLogin();
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
            "Login"
          )}
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

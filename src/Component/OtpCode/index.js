import React, { useState } from "react";
import style from "./OtpCode.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { NotificationManager } from "react-notifications";
import { Box, Button, CircularProgress } from "@mui/material";

export default function OtpCode() {
  const [userAuthOtp, setUserAuthOtp] = useState(null);
  const navigation = useNavigate();
  const location = useLocation();
  const userData = localStorage.getItem("user");
  const [submit, setSubmit] = useState(false);
  const [loader, setLoader] = useState({
    button: false,
    resend: false,
  });
  const pars = JSON.parse(userData);
  // const hendleuserOtpVerify = () => {

  //   console.log("userAuth", userAuthOtp);
  // };

  const hendleuserOtpVerify = () => {
    setSubmit(true);
    if (userAuthOtp) {
      setLoader({ ...loader, button: true });
      const url =
        location.state.type === "signup"
          ? `http://api.victo.ai/auth/signup/${pars?.email}`
          : `http://api.victo.ai/auth/login/${pars?.email}`;
      axios
        .post(url, {
          email: pars?.email,
          passhash: pars?.passhash,
          passcode: userAuthOtp,
        })
        .then((res) => {
          if (res?.data?.key) {
            localStorage.setItem("key", res?.data?.key);
            localStorage.setItem("userData", JSON.stringify(res?.data?.user));
            NotificationManager.success(
              location.state.type === "signup"
                ? "user Registration successfuly"
                : "user Login successfuly"
            );
            navigation("/main");
            setLoader({ ...loader, button: false });
          } else {
            NotificationManager.error(res?.data);
            setLoader({ ...loader, button: false });
          }
        })
        .catch((err) => {
          NotificationManager.error(err);
          setLoader({ ...loader, button: false });
        });
    }
  };

  const handleResendCode = () => {
    setLoader({ ...loader, resend: true });
    const url =
      location.state.type === "signup"
        ? `http://api.victo.ai/auth/signup/${pars?.email}`
        : `http://api.victo.ai/auth/login/${pars?.email}`;
    axios
      .get(url)
      .then((res) => {
        if (res?.data?.passhash) {
          localStorage.setItem("user", JSON.stringify(res?.data));
          NotificationManager.success("OTP send Successfuly");
          setLoader({ ...loader, resend: false });
        } else {
          NotificationManager.error(res?.data, 5000);
          setLoader({ ...loader, resend: false });
        }
      })
      .catch((err) => {
        NotificationManager.error(err, 5000);
        setLoader({ ...loader, resend: false });
      });
  };

  return (
    <div className={style?.main}>
      <div className={`card ${style?.loginform}`}>
        <h4 className="text-center">Check your Email for a code</h4>
        <small>
          We've sent a 6-charactor code to {pars?.email}. The code expires
          shortly. so please enter it soon.
        </small>
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
        {submit === true && !userAuthOtp ? (
          <small className={style.error}>Please Enter OTP code</small>
        ) : null}
        <br />
        <Box sx={{ margin: "auto", display: "block", marginBottom: 2 }}>
          <small>Didn't get the email? </small>
          <Button
            variant="text"
            onClick={() => {
              handleResendCode();
            }}
            sx={{ color: "black", textTransform: "initial", padding: 0 }}
          >
            {loader?.resend ? (
              <Box
                sx={{
                  margin: "auto",
                  display: "block",
                }}
              >
                <CircularProgress size={15} color="inherit" />
              </Box>
            ) : (
              "Resend Code"
            )}
          </Button>
        </Box>
        <button
          className="btn btn-primary"
          onClick={() => {
            hendleuserOtpVerify();
          }}
        >
          {loader?.button ? (
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
            "Verify"
          )}
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

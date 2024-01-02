import React, { useState } from "react";
import style from "../Description.module.css";
import { Button, Card, CircularProgress, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { API_URL } from "../../../../utils";
import {
  addDescription,
  changeStap,
  loeading,
} from "../../../../Redux/Slice/FormSlice";
import copy from "../../../../Assets/Image/copy.svg";

export default function Description() {
  const [discription, setDiscription] = useState("");
  const data = useSelector((state) => state?.form);
  const dispatch = useDispatch();

  const hendleGanrate = () => {
    dispatch(loeading(true));
    axios
      .post(`${API_URL}projects/start`, { original_requirements: discription })
      .then((res) => {
        dispatch(addDescription(res?.data));
        dispatch(loeading(false));
      })
      .catch((err) => {
        dispatch(loeading(false));
      });
  };

  function triggerExample() {
    navigator.clipboard.writeText(data?.description?.project_goals);
  }

  return (
    <div className={`card ${style.cardStyle}`}>
      <label>
        <b>Describe Your Project:</b>
      </label>
      <textarea
        placeholder="I want to build an ecommerce app for …"
        onChange={(e) => {
          setDiscription(e.target.value);
        }}
        className={`form-control ${style.textAriaStyle}`}
      />
      <br />
      <div className={style?.preview}>
        {data.loeading ? (
          <div className={style.loadingScreen}>
            <CircularProgress color="inherit" />
          </div>
        ) : data?.description?.project_name ? (
          <Card sx={{ padding: 2 }}>
            <div className={style.copy}>
              <h5 className="text-center">
                {data?.description?.project_name}: Original Requirements
              </h5>
              <IconButton
                onClick={() => {
                  triggerExample();
                }}
              >
                <img src={copy} alt="img" />
              </IconButton>
            </div>
            {data?.description?.project_goals?.map((val, i) => {
              return (
                <p>
                  {i + 1}. {val}
                </p>
              );
            })}
          </Card>
        ) : null}
      </div>
      <div className={style.buttonFlex}>
        {data?.description?.project_goals ? (
          <Button
            variant="contained"
            sx={{
              textTransform: "initial",
              backgroundColor: "#343a40",
              ":hover": { backgroundColor: "#343a40" },
            }}
            color="primary"
            onClick={() => {
              hendleGanrate();
            }}
          >
            Regenerate
          </Button>
        ) : null}

        <Button
          variant="contained"
          sx={{
            textTransform: "initial",
            backgroundColor: "#343a40",
            ":hover": { backgroundColor: "#343a40" },
            marginLeft: "auto",
            display: "block",
          }}
          color="primary"
          onClick={() => {
            if (data?.description?.id) {
              dispatch(changeStap(1));
            } else {
              hendleGanrate();
            }
          }}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

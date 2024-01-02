import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "../../../../utils";
import {
  addDescription,
  changeStap,
  loeading,
} from "../../../../Redux/Slice/FormSlice";
import { Button, Card, CircularProgress, IconButton } from "@mui/material";
import style from "../Description.module.css";
import copy from "../../../../Assets/Image/copy.svg";

const RequirementAnalysis = () => {
  const data = useSelector((state) => state?.form);
  const dispatch = useDispatch();

  const hendleGanrate = () => {
    dispatch(loeading(true));
    axios
      .post(`${API_URL}projects/discuss/${data?.description?.id}/5`)
      .then((res) => {
        dispatch(addDescription(res?.data));
        dispatch(loeading(false));
      })
      .catch((err) => {
        dispatch(loeading(false));
      });
  };

  useEffect(() => {
    if (!data?.description?.requirement_analysis) {
      hendleGanrate();
    }
  }, []);

  function triggerExample() {
    navigator.clipboard.writeText(data?.description?.user_stories);
  }

  return (
    <div>
      {data.loeading ? (
        <div className={style.loadingScreen}>
          <CircularProgress color="inherit" />
        </div>
      ) : data?.description?.requirement_analysis ? (
        <Card sx={{ padding: 2 }}>
          <div className={style.copy}>
            <h5 className="text-center">
              {data?.description?.project_name}: Requirement Analysis
            </h5>
            <IconButton
              onClick={() => {
                triggerExample();
              }}
            >
              <img src={copy} />
            </IconButton>
          </div>
          {data?.description?.requirement_analysis}
        </Card>
      ) : null}
      <div className={style.buttonFlex}>
        {data?.description?.requirement_analysis ? (
          <Button
            variant="contained"
            sx={{ textTransform: "initial", backgroundColor: "#343a40" }}
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
            dispatch(changeStap(5));
          }}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default RequirementAnalysis;
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
import Edit from "../../../../Assets/Image/Edit.svg";
import copy from "../../../../Assets/Image/copy.svg";

const CompetitiveQuadrandChart = () => {
  const data = useSelector((state) => state?.form);
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [esitContent, setEditContent] = useState("");

  const hendleGanrate = () => {
    dispatch(loeading(true));
    axios
      .post(`${API_URL}projects/discuss/${data?.description?.id}/4`)
      .then((res) => {
        dispatch(addDescription(res?.data));
        dispatch(loeading(false));
      })
      .catch((err) => {
        dispatch(loeading(false));
      });
  };

  useEffect(() => {
    if (!data?.description?.competitive_quadrand_chart) {
      hendleGanrate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function triggerExample() {
    navigator.clipboard.writeText(
      data?.description?.competitive_quadrand_chart
    );
  }

  return (
    <div>
      {data.loeading ? (
        <div className={style.loadingScreen}>
          <CircularProgress color="inherit" />
        </div>
      ) : (
        <Card sx={{ padding: 2 }}>
          <div className={style.copy}>
            <h5 className="text-center">
              {data?.description?.project_name}: Competitive Quadrand Chart
            </h5>
            <div>
              <IconButton
                onClick={() => {
                  setIsEdit(!isEdit);
                  setEditContent(
                    esitContent
                      ? ""
                      : data?.description?.competitive_quadrand_chart
                  );
                }}
              >
                <img src={Edit} alt="img" />
              </IconButton>
              <IconButton
                onClick={() => {
                  triggerExample();
                }}
              >
                <img src={copy} alt="img" />
              </IconButton>
            </div>
          </div>

          {isEdit ? (
            <textarea
              className={`form-control ${style.textAriaStyle} mb-5`}
              value={esitContent}
              onChange={(e) => {
                setEditContent(e.target.value);
              }}
            />
          ) : (
            data?.description?.competitive_quadrand_chart
          )}
        </Card>
      )}
      <div className={style.buttonFlex}>
        {data?.description?.competitive_quadrand_chart ? (
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
            dispatch(changeStap(4));
          }}
        >
          {isEdit ? "save" : "Next"}
        </Button>
      </div>
    </div>
  );
};

export default CompetitiveQuadrandChart;

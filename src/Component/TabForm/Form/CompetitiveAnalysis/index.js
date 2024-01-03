import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Edit from "../../../../Assets/Image/Edit.svg";
import { API_URL } from "../../../../utils";
import {
  addDescription,
  changeStap,
  loeading,
} from "../../../../Redux/Slice/FormSlice";
import { Button, Card, CircularProgress, IconButton } from "@mui/material";
import style from "../Description.module.css";
import copy from "../../../../Assets/Image/copy.svg";

const CompetitiveAnalysis = () => {
  const data = useSelector((state) => state?.form);
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [esitContent, setEditContent] = useState([]);

  const hendleGanrate = () => {
    dispatch(loeading(true));
    axios
      .post(`${API_URL}projects/discuss/${data?.description?.id}/3`)
      .then((res) => {
        dispatch(addDescription(res?.data));
        dispatch(loeading(false));
      })
      .catch((err) => {
        dispatch(loeading(false));
      });
  };

  useEffect(() => {
    if (!data?.description?.competitive_analysis) {
      hendleGanrate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function triggerExample() {
    navigator.clipboard.writeText(data?.description?.competitive_analysis);
  }

  return (
    <div>
      {data.loeading ? (
        <div className={style.loadingScreen}>
          <CircularProgress color="inherit" />
        </div>
      ) : data?.description?.competitive_analysis ? (
        <Card sx={{ padding: 2 }}>
          <div className={style.copy}>
            <h5 className="text-center">
              {data?.description?.project_name}: Competitive Analysis
            </h5>
            <div>
              <IconButton
                onClick={() => {
                  setIsEdit(!isEdit);
                  setEditContent(
                    esitContent.length > 0
                      ? ""
                      : data?.description?.competitive_analysis
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

          {data?.description?.competitive_analysis?.map((val, i) => {
            return isEdit ? (
              i > 1 ? (
                <textarea
                  className={`form-control ${style.textAriaStyle} mb-5`}
                  value={esitContent}
                  onChange={(e) => {
                    setEditContent(e.target.value);
                  }}
                />
              ) : null
            ) : (
              <p>
                {i + 1}. {val}
              </p>
            );
          })}
        </Card>
      ) : null}
      <div className={style.buttonFlex}>
        {data?.description?.competitive_analysis ? (
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
            dispatch(changeStap(3));
          }}
        >
          {isEdit ? "save" : "Next"}
        </Button>
      </div>
    </div>
  );
};

export default CompetitiveAnalysis;

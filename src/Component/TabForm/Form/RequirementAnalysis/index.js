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
import Edit from "../../../../Assets/Image/Edit.svg";

const RequirementAnalysis = () => {
  const data = useSelector((state) => state?.form);
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [esitContent, setEditContent] = useState("");
  const projectId = localStorage.getItem("projectid");
  const token = localStorage.getItem("key");

  const hendleGanrate = () => {
    dispatch(loeading(true));
    axios
      .post(`${API_URL}projects/discuss/${projectId}/5`)
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onHeandleEdit = () => {
    dispatch(loeading(true));
    axios
      .patch(
        `${API_URL}projects/edit/${projectId}/`,
        {
          requirement_analysis: esitContent,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      .then((res) => {
        dispatch(addDescription(res?.data));
        // setEditContent(...data?.description?.user_stories);
        setIsEdit(false);
        dispatch(loeading(false));
      })
      .catch((err) => {
        dispatch(loeading(false));
      });
  };

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
            <div>
              <IconButton
                onClick={() => {
                  setIsEdit(!isEdit);
                  setEditContent(data?.description?.requirement_analysis);
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
            data?.description?.requirement_analysis
          )}
        </Card>
      ) : null}
      <div className={style.buttonFlex}>
        {data?.description?.requirement_analysis && !isEdit ? (
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
            if (isEdit) {
              onHeandleEdit();
            } else {
              dispatch(changeStap(5));
            }
          }}
        >
          {isEdit ? "save" : "Next"}
        </Button>
      </div>
    </div>
  );
};

export default RequirementAnalysis;

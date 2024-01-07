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
  const token = localStorage.getItem("key");
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

  const onHeandleEdit = () => {
    dispatch(loeading(true));
    axios
      .patch(
        `${API_URL}projects/edit/${data?.description?.id}/`,
        {
          competitive_analysis: esitContent,
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
    navigator.clipboard.writeText(data?.description?.competitive_analysis);
  }

  const UserStories = data?.description?.competitive_analysis?.replace(
    /\n/g,
    "<br><br>"
  );

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
                  setEditContent(data?.description?.competitive_analysis);
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
            <p dangerouslySetInnerHTML={{ __html: UserStories }} />
          )}
        </Card>
      ) : null}
      <div className={style.buttonFlex}>
        {data?.description?.competitive_analysis && !isEdit ? (
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
            if (isEdit) {
              onHeandleEdit();
            } else {
              dispatch(changeStap(3));
            }
          }}
        >
          {isEdit ? "save" : "Next"}
        </Button>
      </div>
    </div>
  );
};

export default CompetitiveAnalysis;

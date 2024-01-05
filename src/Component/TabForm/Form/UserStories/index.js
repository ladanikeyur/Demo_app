import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "../../../../utils";
import Edit from "../../../../Assets/Image/Edit.svg";
import {
  addDescription,
  changeStap,
  loeading,
} from "../../../../Redux/Slice/FormSlice";
import { Button, Card, CircularProgress, IconButton } from "@mui/material";
import style from "../Description.module.css";
import copy from "../../../../Assets/Image/copy.svg";

const UserStories = () => {
  const data = useSelector((state) => state?.form);
  const projectId = localStorage.getItem("projectid");
  const [isEdit, setIsEdit] = useState(false);
  const [esitContent, setEditContent] = useState([]);
  const dispatch = useDispatch();
  const token = localStorage.getItem("key");

  const hendleGanrate = () => {
    dispatch(loeading(true));
    axios
      .post(`${API_URL}projects/discuss/${projectId}/2`)
      .then((res) => {
        dispatch(addDescription(res?.data));
        dispatch(loeading(false));
      })
      .catch((err) => {
        dispatch(loeading(false));
      });
  };

  useEffect(() => {
    if (!data?.description?.user_stories) {
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
          user_stories: esitContent,
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
      <div className={style.buttonFlex}>
        <div className={style?.preview}>
          {data.loeading ? (
            <div className={style.loadingScreen}>
              <CircularProgress color="inherit" />
            </div>
          ) : data?.description?.user_stories ? (
            <Card sx={{ padding: 2 }}>
              <div className={style.copy}>
                <h5 className="text-center">
                  <b>{data?.description?.project_name}: User Stories</b>
                </h5>
                <div>
                  <IconButton
                    onClick={() => {
                      setIsEdit(!isEdit);
                      setEditContent(data?.description?.user_stories);
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
                <p>{data?.description?.user_stories}</p>
              )}
            </Card>
          ) : null}
        </div>
      </div>
      <div className={style.buttonFlex}>
        {data?.description?.user_stories && !isEdit ? (
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
            marginLeft: "auto",
            display: "block",
          }}
          color="primary"
          onClick={() => {
            if (isEdit) {
              onHeandleEdit();
            } else {
              dispatch(changeStap(2));
            }
          }}
        >
          {isEdit ? "save" : "Next"}
        </Button>
      </div>
    </div>
  );
};

export default UserStories;

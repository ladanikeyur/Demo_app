import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "../../../../utils";
import { addDescription, loeading } from "../../../../Redux/Slice/FormSlice";
import { Button, Card, CircularProgress, IconButton } from "@mui/material";
import style from "../Description.module.css";
import copy from "../../../../Assets/Image/copy.svg";
import { useNavigate } from "react-router-dom";
import Edit from "../../../../Assets/Image/Edit.svg";

const Design = () => {
  const data = useSelector((state) => state?.form);
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [esitContent, setEditContent] = useState("");
  const token = localStorage.getItem("key");

  const navigate = useNavigate();
  const hendleGanrate = () => {
    dispatch(loeading(true));
    axios
      .post(`${API_URL}projects/discuss/${data?.description?.id}/7`)
      .then((res) => {
        dispatch(addDescription(res?.data));
        dispatch(loeading(false));
      })
      .catch((err) => {
        dispatch(loeading(false));
      });
  };

  const onHeandleEdit = () => {
    dispatch(loeading(true));
    axios
      .patch(
        `${API_URL}projects/edit/${data?.description?.id}/`,
        {
          ui_design_draft: esitContent,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      .then((res) => {
        dispatch(addDescription(res?.data));
        setIsEdit(false);
        dispatch(loeading(false));
      })
      .catch((err) => {
        dispatch(loeading(false));
      });
  };

  useEffect(() => {
    if (!data?.description?.ui_design_draft) {
      hendleGanrate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function triggerExample() {
    navigator.clipboard.writeText(data?.description?.ui_design_draft);
  }

  const UserStories = data?.description?.ui_design_draft?.replace(
    /\n/g,
    "<br><br>"
  );

  return (
    <div>
      {data.loeading ? (
        <div className={style.loadingScreen}>
          <CircularProgress color="inherit" />
        </div>
      ) : data?.description?.ui_design_draft ? (
        <Card sx={{ padding: 2 }}>
          <div className={style.copy}>
            <h5 className="text-center">
              {data?.description?.project_name}: UI Design Draft
            </h5>
            <div>
              <IconButton
                onClick={() => {
                  setIsEdit(!isEdit);
                  setEditContent(data?.description?.ui_design_draft);
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
        {data?.description?.ui_design_draft && !isEdit ? (
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
              navigate("/report");
            }
          }}
        >
          {isEdit ? "save" : "View Document"}
        </Button>
      </div>
    </div>
  );
};

export default Design;

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

const RequirementPool = () => {
  const data = useSelector((state) => state?.form);
  const [isEdit, setIsEdit] = useState(false);
  const [esitContent, setEditContent] = useState([]);
  const dispatch = useDispatch();
  const hendleGanrate = () => {
    dispatch(loeading(true));
    axios
      .post(`${API_URL}projects/discuss/${data?.description?.id}/6`)
      .then((res) => {
        dispatch(addDescription(res?.data));
        dispatch(loeading(false));
      })
      .catch((err) => {
        dispatch(loeading(false));
      });
  };

  useEffect(() => {
    if (!data?.description?.requirement_pool) {
      hendleGanrate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function triggerExample() {
    navigator.clipboard.writeText("");
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
              {data?.description?.project_name}: Requirement Pool
            </h5>
            <div>
              <IconButton
                onClick={() => {
                  setIsEdit(!isEdit);
                  setEditContent(
                    esitContent.length > 0
                      ? ""
                      : data?.description?.requirement_pool
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
          <p>
            {/* {data?.description?.requirement_pool?.length > 0
              ? data?.description?.requirement_pool?.map((val, i) => {
                  const key = Object.keys(val);
                  //   setContent(content + val[key[0]]);
                  return (
                    <>
                      <p>
                        {i + 1}. {val[key[0]]}
                      </p>
                    </>
                  );
                })
              : null} */}

            {data?.description?.requirement_pool?.map((val, i) => {
              const key = Object.keys(val);
              return isEdit ? (
                i < 1 ? (
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
                  {i + 1}. {val[key[0]]}
                </p>
              );
            })}
          </p>
        </Card>
      )}
      <div className={style.buttonFlex}>
        {data?.description?.requirement_pool?.length > 0 && !isEdit ? (
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
            dispatch(changeStap(6));
          }}
        >
          {isEdit ? "save" : "Next"}
        </Button>
      </div>
    </div>
  );
};

export default RequirementPool;

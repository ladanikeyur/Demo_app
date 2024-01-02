import axios from "axios";
import React, { useEffect } from "react";
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

const RequirementPool = () => {
  const data = useSelector((state) => state?.form);
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
            <IconButton
              onClick={() => {
                triggerExample();
              }}
            >
              <img src={copy} alt="img" />
            </IconButton>
          </div>
          <p>
            {data?.description?.requirement_pool?.length > 0
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
              : null}
          </p>
        </Card>
      )}
      <div className={style.buttonFlex}>
        {data?.description?.requirement_pool?.length > 0 ? (
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
          Next
        </Button>
      </div>
    </div>
  );
};

export default RequirementPool;

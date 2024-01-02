import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "../../../../utils";
import {
  addDescription,
  changeStap,
  loeading,
} from "../../../../Redux/Slice/FormSlice";
import { Button, CircularProgress } from "@mui/material";
import style from "../Description.module.css";

const CompetitiveQuadrandChart = () => {
  const data = useSelector((state) => state?.form);
  const dispatch = useDispatch();

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
  return (
    <div>
      {data.loeading ? (
        <div className={style.loadingScreen}>
          <CircularProgress color="inherit" />
        </div>
      ) : (
        <>
          <h5 className="text-center">
            {data?.description?.project_name}: Competitive Quadrand Chart
          </h5>
          <p>{data?.description?.competitive_quadrand_chart}</p>
          {/* {data?.CompetitiveAnalysis?.competitive_analysis?.map((val, i) => {
            return <p>{val}</p>;
          })} */}
        </>
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
          Next
        </Button>
      </div>
    </div>
  );
};

export default CompetitiveQuadrandChart;

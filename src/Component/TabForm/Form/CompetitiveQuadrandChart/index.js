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
import QuadrantChart from "../QuadrantChart";

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

  function triggerExample() {
    navigator.clipboard.writeText(
      data?.description?.competitive_quadrand_chart
    );
  }

  const inputDataString = `{
    "title": "Feature Richness vs User Experience",
    "xAxis": "Basic → Feature Rich",
    "yAxis": "Simple UX → Engaging UX",
    "quadrants": ["Low Priority Enhancements", "Niche Features", "Must Haves", "Key Differentiators"],
    "competitors": [
      {"name": "CompetitorX", "coordinates": [0.8, 0.9]},
      {"name": "CompetitorY", "coordinates": [0.6, 0.7]},
      {"name": "ASCII CompetitorZ", "coordinates": [0.9, 0.6]},
      {"name": "Our Target Product", "coordinates": [0.7, 0.8]}
    ]
  }`;

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
              {/* <IconButton
                onClick={() => {
                  setIsEdit(!isEdit);
                  setEditContent(data?.description?.competitive_quadrand_chart);
                }}
              >
                <img src={Edit} alt="img" />
              </IconButton> */}
              <IconButton
                onClick={() => {
                  triggerExample();
                }}
              >
                <img src={copy} alt="img" />
              </IconButton>
            </div>
          </div>

          {data?.description?.competitive_quadrand_chart ? (
            <QuadrantChart
              dataString={`${data?.description?.competitive_quadrand_chart}`}
            />
          ) : null}

          {/* {data?.description?.competitive_quadrand_chart} */}
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
          Next
        </Button>
      </div>
    </div>
  );
};

export default CompetitiveQuadrandChart;

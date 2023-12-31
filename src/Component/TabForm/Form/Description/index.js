import React from "react";
import style from "../Description.module.css";
import { Button } from "@mui/material";

export default function Description() {
  return (
    <div className={`card ${style.cardStyle}`}>
      <textarea
        placeholder="Description"
        className={`form-control ${style.textAriaStyle}`}
      />
      <div className={style.buttonFlex}>
        <Button
          variant="contained"
          sx={{ textTransform: "initial", backgroundColor: "#343a40" }}
          color="primary"
        >
          Regenerate
        </Button>
        <Button
          variant="contained"
          sx={{ textTransform: "initial", backgroundColor: "#343a40" }}
          color="primary"
        >
          Next
        </Button>
      </div>
    </div>
  );
}

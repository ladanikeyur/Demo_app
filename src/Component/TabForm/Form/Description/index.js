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
        <Button variant="contained" color="primary">
          Reset
        </Button>
        <Button variant="contained" color="primary">
          Save
        </Button>
      </div>
    </div>
  );
}

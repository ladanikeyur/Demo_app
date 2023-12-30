import React from "react";
import { useDispatch } from "react-redux";
import style from "../Description.module.css";
import { Button, TextareaAutosize } from "@mui/material";

export default function Description() {
  const dispatch = useDispatch();
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

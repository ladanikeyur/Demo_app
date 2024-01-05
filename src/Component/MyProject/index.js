import React, { useEffect, useState } from "react";
import style from "./MyProject.module.css";
import { Card } from "@mui/material";
import { useDispatch } from "react-redux";
import { addDescription, loeading } from "../../Redux/Slice/FormSlice";
import axios from "axios";
import { API_URL } from "../../utils";
import { useNavigate } from "react-router-dom";

export default function MyProject() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //   const data = useSelector((state) => state?.form);
  const token = localStorage.getItem("key");
  const [projectData, setProjectData] = useState([]);
  const hendleGanrate = () => {
    dispatch(loeading(true));
    axios
      .get(`${API_URL}projects/list`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => {
        setProjectData(res?.data);
        // dispatch(addDescription(res?.data));
        dispatch(loeading(false));
      })
      .catch((err) => {
        dispatch(loeading(false));
      });
  };

  useEffect(() => {
    hendleGanrate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={style.productmain}>
      <div className="row">
        {projectData?.map((val, i) => {
          return (
            <div className="col-sm-4 mb-4">
              <Card
                sx={{
                  minHeight: "30vh",
                  position: "relative",
                  boxShadow: "11px 13px 20px 0px #00000014",
                }}
              >
                <h6 className={style?.projectheading}>● {val?.project_name}</h6>
                <div className={style.requrimentcontent}>
                  <p className={style.requriment}>
                    <b>Requriment:</b> {val?.original_requirements}
                  </p>
                </div>
                <button
                  className={style?.editbutton}
                  onClick={() => {
                    dispatch(addDescription(val));
                    localStorage.setItem("projectid", val?.id);
                    navigate("/", { state: { projectId: val?.id } });
                  }}
                >
                  Edit
                </button>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}

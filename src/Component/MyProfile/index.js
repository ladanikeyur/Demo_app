import { Card } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import style from "./MyProfile.module.css";

export default function MyProfile() {
  const fileInputRef = useRef(null);
  const [email, setEmail] = useState("");
  const userEmail = localStorage.getItem("userData");
  const userData = JSON.parse(userEmail);

  useEffect(() => {
    setEmail(userData?.email);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleButtonClick = () => {
    // Trigger the click event of the file input
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    // Handle the selected file(s) here
    const selectedFile = e.target.files[0];
    console.log("Selected file:", selectedFile);
  };
  return (
    <div className="m-4">
      <Card sx={{ padding: 2 }}>
        <button
          onClick={handleButtonClick}
          className={style.uploadButtonProfile}
        >
          Upload Profile
        </button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <div className="row">
          <div className="col-sm-6">
            <input
              type="text"
              placeholder="Full Name"
              className="form-control"
            />
            <br />
            <input
              type="number"
              placeholder="Phone No"
              className="form-control"
            />
          </div>
          <div className="col-sm-6">
            <input
              type="email"
              value={email}
              placeholder="Email"
              className="form-control"
            />
            <br />
            <input
              type="text"
              placeholder="Organization Name"
              className="form-control"
            />
          </div>
        </div>
        <br />
        <textarea
          placeholder="Organization: Description"
          className={style?.textariainput}
        />
        <br />
        <br />
        <div>
          <button onClick={handleButtonClick} className={style.uploadButton}>
            Upload Organization Logo
          </button>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </div>
        <br />
        <br />
        <button className={style?.updateProfile}>Update Profile</button>
      </Card>
    </div>
  );
}

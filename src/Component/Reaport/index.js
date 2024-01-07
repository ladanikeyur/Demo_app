import html2pdf from "html2pdf.js";
import { useDispatch, useSelector } from "react-redux";
import style from "./Report.module.css";
import { removeDescription } from "../../Redux/Slice/FormSlice";
import { useNavigate } from "react-router-dom";

const Report = () => {
  const data = useSelector((state) => state?.form);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const convertToPdf = () => {
    const content = document.getElementById("your-content-id"); // Replace with the ID of your content
    const pdfOptions = {
      margin: 10,
      filename: `${data?.description?.project_name} Document.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    html2pdf(content, pdfOptions);

    navigate("/");
    dispatch(removeDescription());
  };

  return (
    <div className={style.pdfMain}>
      {/* Your web content goes here */}
      <div id="your-content-id">
        <p className={style.ProjectName}>{data?.description?.project_name}</p>
        <p className={style.heading}>Original Requirements</p>
        {data?.description?.project_goals?.map((val, i) => {
          return (
            <p>
              {i + 1}. {val}
            </p>
          );
        })}
        <p className={style.heading}>User Stories</p>
        {data?.description?.user_stories?.map((val, i) => {
          return (
            <p>
              {i + 1}. {val}
            </p>
          );
        })}
        <p className={style.heading}>Competitive Analysis</p>
        {data?.description?.competitive_analysis?.map((val, i) => {
          return (
            <p>
              {i + 1}. {val}
            </p>
          );
        })}
        <p className={style.heading}>Competitive Quadrand Chart</p>
        {data?.description?.competitive_quadrand_chart}
        <p className={style.heading}>Requirement Analysis</p>
        {data?.description?.requirement_analysis}
        <p className={style.heading}>Requirement Pool</p>
        {data?.description?.requirement_pool?.map((val, i) => {
          const key = Object.keys(val);
          return (
            <p>
              {i + 1}. {val[key[0]]}
            </p>
          );
        })}
        <p className={style.heading}>UI Design Draft</p>
        {data?.description?.ui_design_draft}
      </div>

      <button onClick={convertToPdf} className={`${style.reportButton}`}>
        Convert to PDF
      </button>
    </div>
  );
};

export default Report;

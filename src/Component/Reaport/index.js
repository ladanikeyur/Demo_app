import html2pdf from "html2pdf.js";

const Report = () => {
  const convertToPdf = () => {
    const content = document.getElementById("your-content-id"); // Replace with the ID of your content
    const pdfOptions = {
      margin: 10,
      filename: "output.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    html2pdf(content, pdfOptions);
  };

  return (
    <div>
      {/* Your web content goes here */}
      <div id="your-content-id">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <p>This is your web content</p>
          <h1 style={{ color: "red" }}>dasdsadsdfsd</h1>
        </div>
        <p>This is your web content</p>
        <h1 style={{ color: "red" }}>dasdsadsdfsd</h1>
        <hr />
        <p>Testt</p>
      </div>

      {/* Button to trigger PDF conversion */}
      <button onClick={convertToPdf}>Convert to PDF</button>
    </div>
  );
};

export default Report;

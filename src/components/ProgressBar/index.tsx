import { ProgressBarType } from "../../types";

import "./index.css";

const ProgressBar: React.FC<ProgressBarType> = ({ filled }) => {
  return (
    <>
      <div>Submitting Data</div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div className="progressBar">
          <div
            style={{
              height: "100%",
              width: `${filled}%`,
              backgroundColor: "#0077b6",
              transition: "width  0.5s",
            }}
          ></div>
        </div>
        <div style={{ color: "black" }}>{filled}%</div>
      </div>
    </>
  );
};

export default ProgressBar;

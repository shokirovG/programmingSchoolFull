import ProgressBar from "react-bootstrap/ProgressBar";

function Progress({ now }) {
  if (now == Infinity || !now) {
    return null;
  }
  return (
    <div style={{ position: "relative", width: "100%" }}>
      <ProgressBar
        animated
        nav={now}
        style={{ fontSize: "18px", height: "20px", color: "blue" }}
        variant={now == 100 ? "success" : "warning"}
        className="progressBar"
      />
      <span
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "black", // Matn rangini o'zgartirish
          fontWeight: "bold",
          fontSize: "18px",
        }}
      >{`${now}%`}</span>
    </div>
  );
}

export default Progress;

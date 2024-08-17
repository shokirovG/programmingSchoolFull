import ProgressBar from "react-bootstrap/ProgressBar";

function Progress({ now }) {
  if (now == Infinity || !now) {
    return null;
  }
  return (
    <>
      <ProgressBar
        animated
        now={now}
        label={`${now}%`}
        style={{ fontSize: "18px", height: "20px" }}
      />
    </>
  );
}

export default Progress;

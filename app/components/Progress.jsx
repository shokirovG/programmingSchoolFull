import ProgressBar from "react-bootstrap/ProgressBar";

function Progress({ now }) {
  return (
    <>
      {now ? (
        <ProgressBar
          animated
          now={now}
          label={`${now}%`}
          style={{ fontSize: "18px", height: "20px" }}
        />
      ) : null}
    </>
  );
}

export default Progress;

import React from "react";

export default function Main({ data }) {
  return (
    <>
      <h3>{data.activity}</h3>

      <div className="activity-result">
        <p>
          Activity type: <span>{data.type}</span>
        </p>

        <p className="progress-label">Activity's price ($):</p>
        <progress value={data.price}></progress>

        <p className="result-item">
          Number of participants: <span>{data.participants}</span>{" "}
        </p>

        <p className="progress-label">Factor of accessibility:</p>
        <progress value={Math.abs(data.accessibility - 1)}></progress>

        {data.link && <a href={data.link}>{data.link}</a>}
      </div>
    </>
  );
}

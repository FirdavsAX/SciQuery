import React from "react";

const TitleInput = ({ title, setTitle, titleRef }) => (
  <div className="card mb-5">
    <div className="card-body">
      <h5 className="card-title">Title</h5>
      <input
        type="text"
        className="form-control"
        placeholder="Enter question title. (For example: how can I fix this math problem)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        ref={titleRef}
      />
    </div>
  </div>
);

export default TitleInput;

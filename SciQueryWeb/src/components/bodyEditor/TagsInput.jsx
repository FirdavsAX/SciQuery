import React from "react";

const TagsInput = ({ tagsInput,createQuestion,handleGetTags }) => (
  <div className="card mb-5">
    <div className="card-body">
      <h5 className="card-title">Tags</h5>
      <input
        type="text"
        className="form-control"
        placeholder="e.g. (issue, math, multiply, ...)"
        value={tagsInput}
        onChange={(e) => handleGetTags(e.target.value)}
      />
      <button
        onClick={createQuestion}
        disabled={tagsInput.trim() === ""}
        className="btn btn-primary"
      >
        Create question
      </button>
    </div>
  </div>
);

export default TagsInput;

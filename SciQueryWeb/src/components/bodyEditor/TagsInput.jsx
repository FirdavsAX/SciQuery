import React from "react";

const TagsInput = ({ tagsInput, submitAction, setTagsInput,handleGetTags }) => {
  const handleInputChange = (e) => {
    const value = e.target.value;
      setTagsInput(value);
    handleGetTags(value);
  };
  return (
    <div className="card mb-5">
      <div className="card-body">
        <h5 className="card-title">Teglar</h5>
        <input
          type="text"
          className="form-control"
          placeholder="e.g. (issue, math, multiply, ...)"
          value={tagsInput}
          onChange={handleInputChange}
        />
        <button
          onClick={submitAction}
          disabled={(tagsInput + "").trim() === ""}
          className="btn btn-primary"
        >
          Jo'natish
        </button>
      </div>
    </div>
  );
};

export default TagsInput;

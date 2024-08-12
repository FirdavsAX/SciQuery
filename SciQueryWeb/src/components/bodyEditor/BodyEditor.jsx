import React from "react";
import JoditEditor from "jodit-react";

const BodyEditor = ({ body, setBody, editorRef, handleScroll }) => (
  <div className="card mb-5">
    <div className="card-body">
      <h5 className="card-title">What is the problem</h5>
      <div className="my-3 h-100">
        <JoditEditor ref={editorRef} value={body} onChange={(newBody) => setBody(newBody)} />
      </div>
      <button
        disabled={body.trim() === ""}
        className="btn btn-primary"
        onClick={handleScroll}
      >
        Next
      </button>
    </div>
  </div>
);

export default BodyEditor;

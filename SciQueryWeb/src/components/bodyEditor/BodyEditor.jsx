import React from "react";
import JoditEditor from "jodit-react";

const BodyEditor = ({title,body, setBody, editorRef,buttonTitle, handleScroll }) => (
  <div className="card mb-5">
    <div className="card-body">
      <h5 className="card-title">{title}</h5>
      <div className="my-3 h-100">
        <JoditEditor ref={editorRef} value={body} onChange={(newBody) => setBody(newBody)} />
      </div>
      <button
        disabled={body.trim() === ""}
        className="btn btn-primary"
        onClick={handleScroll}
      >
        {buttonTitle}
      </button>
    </div>
  </div>
);

export default BodyEditor;

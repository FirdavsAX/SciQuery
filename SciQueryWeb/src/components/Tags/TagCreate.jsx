import React, { useState } from "react";
import { create } from "../../services/ApiService";

function TagCreate() {
  const [name, setName] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const tag = {
      name,
    };
    await create("https://localhost:7008/api/Tags", tag);
  };
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="tagName">Name of tag</label>
      <input
      className="form-control"
        id="tagName"
        type="text"
        onChange={(e) => setName(e.target.value)}
      ></input>
      <button type="submit">Send</button>
    </form>
  );
}

export default TagCreate;

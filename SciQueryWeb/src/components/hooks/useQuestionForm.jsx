import { useState, useRef } from "react";

const useQuestionForm = () => {
  const titleRef = useRef(null);
  const editorRef = useRef(null);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [tagsInput, setTagsInput] = useState("");

  const handleScroll = () => {
    titleRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleGetTags = (e) => {
    setTagsInput(e);

    const tagsArray = tagsInput.split(/[ ,.!?]+/).filter(Boolean);
    setTags(tagsArray);
  };
  return {
    title,
    setTitle,
    body,
    setBody,
    tags,
    tagsInput,
    setTagsInput,
    titleRef,
    editorRef,
    handleScroll,
    handleGetTags
  };
};

export default useQuestionForm;

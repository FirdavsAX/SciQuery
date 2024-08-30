import { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "./useFetch";

const useQuestionForm = () => {
  const titleRef = useRef(null);
  const editorRef = useRef(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [tagsInput, setTagsInput] = useState("");
  const [images,setImages] = useState([]);
  const handleScroll = () => {
    titleRef.current.scrollIntoView({ behavior: "smooth" });
  };
  const handleGetTags = (e) => {
    const tagsArray = e.split(" ");
    setTags(tagsArray);
  };
  return {
    title,
    setTitle,
    body,
    setBody,
    images,
    setImages,
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

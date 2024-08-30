import React, { useEffect, useState } from "react";
import TitleInput from "../../../components/bodyEditor/Title";
import BodyEditor from "../../../components/bodyEditor/BodyEditor";
import TagsInput from "../../../components/bodyEditor/TagsInput";
import useQuestionForm from "../../../components/hooks/useQuestionForm";
import { useCreate } from "../../../components/hooks/useCreate";
import Spinner from "../../../components/Spinner/Spinner";
import { useNavigate, useParams } from "react-router-dom";
import ImageInput from "../../../components/bodyEditor/ImageUploads/ImageInput";
import { useFetch } from "../../../components/hooks/useFetch";
import {useUpdate} from '../../../components/hooks/useUpdate'

function CreateAndUpdateQuestionPage() {

  const { id } = useParams();
  const url = `questions/${id}`;
  const {
    data: question,
  } = id && useFetch(url);

  const {
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
    setTags,
    handleScroll,
    handleGetTags,
  } = useQuestionForm();

  const { uploadImage, create, loading } = useCreate("questions/");
  const { update } = id && useUpdate(url);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (question) {
      setTitle(question.title || "");
      setBody(question.body || "");
      setTagsInput(question.tags.join(' ') || []);
      const formattedImages = question.images?.map(
        (image) => `data:${image.contentType};base64,${image.bytes}`
      ) || [];
      setImages(formattedImages);
    }
  }, [question, setTitle, setBody, setTagsInput, setImages]);
  
  const createOrUpdate = async () => {
    // Assuming the existing images have a filePath
    const existingImages = question &&
      question.images &&
      question.images.length > 0 ?
      question.images.map(x => x.fileName) : [];


    const newImages = images.filter(image => image.isNew).map(image => image.file);
  
    let imagePaths = [...existingImages];
  
    if (newImages.length > 0) {
      const uploadedImages = await uploadImage(newImages, "questions/upload-image");
      imagePaths = [...imagePaths, ...uploadedImages];
    }
    // Ensure tags are populated if the user doesn't change them
    const questionData = { title, body, tags, imagePaths };
    if (!tags || tags.length < 1) {
      // Use the original tags from the question if tags are empty or null
      tags.push(question.tags || []);
    }    

    let result;
    if (id) {
      await update(`questions/${id}`, questionData);
      result = question;
    } else {
      result = await create(questionData);
    }
  
    navigate(`/questions/${result.id}`);
  };
  return (
    <>
      <h1>Savol</h1>
      <hr />
      <TitleInput title={title} setTitle={setTitle} titleRef={titleRef} />
      <ImageInput images={images} setImages={setImages} />
      <BodyEditor
        title={"Write your problem"}
        body={body}
        setBody={setBody}
        buttonTitle={"Next"}
        editorRef={editorRef}
        handleScroll={handleScroll}
      />
      <TagsInput
        tagsInput={tagsInput}
        setTagsInput={setTagsInput}
        submitAction={createOrUpdate}
        handleGetTags={handleGetTags}
      />
      <> {loading && <Spinner />}</>
    </>
  );
}

export default CreateAndUpdateQuestionPage;

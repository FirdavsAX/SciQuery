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
  const navigate = useNavigate();
  
  const createOrUpdate = async () => {
    const newImages = images.filter(image => image.isNew).map(image => image.file);
    let imagePaths;
    if (newImages.length > 0) {
      const uploadedImages = await uploadImage(newImages, "questions/upload-image");
      imagePaths = [...uploadedImages];
    }
  
    // Ensure tags are populated
    const questionData = { title, body, tags, imagePaths };
  
    let result = await create(questionData);
  
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

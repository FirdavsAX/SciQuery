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
        (image) => ({
          src: `data:${image.contentType};base64,${image.bytes}`,
          isNew: false,
          fileName : image.fileName
        })
      ) || [];
      
      setImages(formattedImages);
    }
  }, [question, setTitle, setBody, setTagsInput, setImages]);
  
  const createOrUpdate = async () => {
    // Handle existing images
    const existingImages = images ? images.filter(x => !x.isNew) : [];
    const existingImagePaths = existingImages.map(x => x.fileName);
  
    // Track new images and removed images
    const newImages = images.filter(image => image.isNew).map(image => image.file);
    const removedImagePaths = existingImagePaths.filter(imagePath => !images.some(image => image.fileName === imagePath));
  
    // Upload new images
    let imagePaths = [...existingImagePaths];
  
    if (newImages.length > 0) {
      const uploadedImages = await uploadImage(newImages, "questions/upload-image");
      imagePaths = [...imagePaths, ...uploadedImages];
    }
  
    // Ensure tags are populated
    const questionData = { title, body, tags: tags.length > 0 ? tags : question.tags, imagePaths };
  
    let result;
    if (id) {
      // Update the question with image deletions
      await update(`questions/${id}`, { ...questionData, removedImagePaths });
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

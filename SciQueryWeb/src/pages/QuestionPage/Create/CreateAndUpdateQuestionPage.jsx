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
    handleScroll,
    handleGetTags,
  } = useQuestionForm();

  const { uploadImage, create, loading } = useCreate("questions/");
  const navigate = useNavigate();
  

  const editImages = question?.images?.map(
    (image) => `data:${image.contentType};base64,${image.bytes}`
  );

  const createQuestion = async () => {
    const question = { title, body, imagePaths: [], tags };

    const res = await uploadImage(images, "questions/upload-image");
    question.imagePaths = res;
    const result = await create(question);

    navigate(`/questions/${result.id}`);
  };

  return (
    <>
      <h1>Ask a public question</h1>
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
        createQuestion={createQuestion}
        handleGetTags={handleGetTags}
      />
      <> {loading && <Spinner />}</>
    </>
  );
}

export default CreateAndUpdateQuestionPage;

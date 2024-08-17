import React from "react";
import TitleInput from "../../../components/bodyEditor/Title";
import BodyEditor from "../../../components/bodyEditor/BodyEditor";
import TagsInput from "../../../components/bodyEditor/TagsInput";
import useQuestionForm from "../../../components/hooks/useQuestionForm";
import { useCreate } from "../../../components/hooks/useCreate";
import Spinner from "../../../components/Spinner/Spinner";
import { useNavigate } from "react-router-dom";
import ImageInput from "../../../components/bodyEditor/ImageUploads/ImageInput";

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
    handleScroll,
    handleGetTags,
  } = useQuestionForm();

  const { uploadImage, create, loading } = useCreate("questions/");
  const navigate = useNavigate();

  const createQuestion = async () => {
    const question = { title, body, imagePaths: [], tags };

    const res = await uploadImage(images, "questions/upload-image");
    question.imagePaths = res;
    console.log(res);
    console.log(question.imagePaths)
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
        body={body}
        setBody={setBody}
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

import React from "react";
import BodyEditor from "../../../components/bodyEditor/BodyEditor";
import { useCreate } from "../../../components/hooks/useCreate";
import Spinner from "../../../components/Spinner/Spinner";
import ImageInput from "../../../components/bodyEditor/ImageUploads/ImageInput";
import useQuestionForm from "../../hooks/useQuestionForm";

function CreateAnswer({questionId}) {
  const { body, setBody, images, setImages, editorRef  } = useQuestionForm();

  const { uploadImage, create, loading } = useCreate("answers/");

  const createAnswer = async () => {
    const answer = { body, imagePaths: [], questionId : questionId,userId : '0'};
    console.log(images);

    const res = await uploadImage(images.map(x => x.file), "answers/upload-image");
    answer.imagePaths = res;

    const result = await create(answer);
    window.location.reload();
  };

  return (
    <>
      <h1>Your answer</h1>
      <hr />
      <ImageInput images={images} setImages={setImages} />
      <BodyEditor
        body={body}
        setBody={setBody}
        buttonTitle={"Create"}
        editorRef={editorRef}
        title={"Write answer"}
        handleScroll={createAnswer}
      />
      <> {loading && <Spinner />}</>
    </>
  );
}

export default CreateAnswer;

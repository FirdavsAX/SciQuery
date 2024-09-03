import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../../../components/Spinner/Spinner";
import useQuestionForm from "../../hooks/useQuestionForm";
import { useFetch } from "../../../components/hooks/useFetch";
import { useUpdate } from "../../../components/hooks/useUpdate";
import { useCreate } from "../../../components/hooks/useCreate";
import BodyEditor from "../../../components/bodyEditor/BodyEditor";
import ImageInput from "../../../components/bodyEditor/ImageUploads/ImageInput";

function UpdateAnswer({ questionId, answerId }) {
  const navigate = useNavigate();
  const { body, setBody, images, setImages, editorRef } = useQuestionForm();

  const { data: answer } = answerId && useFetch(`answers/${answerId}`);
  const { uploadImage, create, loading } = useCreate("answers/");
  const { update } = answerId && useUpdate(`answers/${answerId}`);

  useEffect(() => {
    if (answer) {
      setBody(answer.body || "");
      const formattedImages = answer.images?.map((image) => ({
        src: `data:${image.contentType};base64,${image.bytes}`,
        isNew: false,
        fileName: image.fileName,
      })) || [];
      setImages(formattedImages);
    }
  }, [answer, setBody, setImages]);

  const createOrUpdateAnswer = async () => {
    // Handle existing images
    const existingImages = images.filter((x) => !x.isNew);
    const existingImagePaths = existingImages.map((x) => x.fileName);

    // Track new images and removed images
    const newImages = images.filter((image) => image.isNew).map((image) => image.file);
    const removedImagePaths = existingImagePaths.filter(
      (imagePath) => !images.some((image) => image.fileName === imagePath)
    );

    // Upload new images
    let imagePaths = [...existingImagePaths];
    if (newImages.length > 0) {
      const uploadedImages = await uploadImage(newImages, "answers/upload-image");
      imagePaths = [...imagePaths, ...uploadedImages];
    }

    const answerData = { body, imagePaths, questionId,userId : "" };

    if (answerId) {
      // Update the answer with image deletions
      await update(`answers/${answerId}`, { ...answerData, removedImagePaths });
    } else {
      // Create new answer
      await create(answerData);
    }

    navigate(`/questions/${questionId}`);
  };

  return (
    <>
      <h1>Your answer</h1>
      <hr />
      <ImageInput images={images} setImages={setImages} />
      <BodyEditor
        body={body}
        setBody={setBody}
        buttonTitle={answerId ? "Update" : "Create"}
        editorRef={editorRef}
        title={"Write answer"}
        handleScroll={createOrUpdateAnswer}
      />
      {loading && <Spinner />}
    </>
  );
}

export default UpdateAnswer;

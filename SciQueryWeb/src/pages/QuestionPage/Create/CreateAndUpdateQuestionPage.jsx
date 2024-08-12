import React from 'react';
import TitleInput from '../../../components/bodyEditor/Title';
import BodyEditor from '../../../components/bodyEditor/BodyEditor';
import TagsInput from '../../../components/bodyEditor/TagsInput';
import useQuestionForm from '../../../components/hooks/useQuestionForm';
import { useCreate } from '../../../components/hooks/useCreate';
import { API_BASE_URL } from '../../../config/Constants';
import Spinner from '../../../components/Spinner/Spinner';

function CreateAndUpdateQuestionPage() {
  const {
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
    handleGetTags,
  } = useQuestionForm();

  const { create, loading } = useCreate(API_BASE_URL + 'questions/');

  const createQuestion = async () => {
    const question = { title, body, tags };

      await create(question);
  };

  return (
    <>
      <h1>Ask a public question</h1>
      <hr />

      <TitleInput title={title} setTitle={setTitle} titleRef={titleRef} />
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
      <> {loading && <Spinner/> }</>
    </>
  );
}

export default CreateAndUpdateQuestionPage;

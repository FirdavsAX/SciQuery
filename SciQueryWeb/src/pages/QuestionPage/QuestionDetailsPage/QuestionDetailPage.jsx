import React, { lazy, Suspense, useEffect, useRef, useState } from "react";
import { useParams, Outlet, useLocation } from "react-router-dom";
import Spinner from "../../../components/Spinner/Spinner";
import SpinnerMini from "../../../components/Spinner/SpinnerMini/SpinnerMini";
import "./QuestionDetailPage.css";
import QuestionDetail from "../../../components/Questions/QuestionDetail/QuestionDetail";
import UpdateAnswer from "../../../components/Answers/AnswerUpdate/AnswerUpdate";
import AnswersList from "../../../components/Answers/AnswersList/AnswersList";
import { useUserIdFromToken } from "../../../components/hooks/useUserIdFromToken";

// Lazy loaded components
const CreateAnswer = lazy(() =>
  import("../../../components/Answers/AnswerCreate/AnswerCreate")
);
const RelatedQuestions = lazy(() =>
  import("../../../components/Questions/RelatedQuestions/RelatedQuestions")
);

function QuestionDetailPage() {
  const { id } = useParams();
  const [showOutlet, setShowOutlet] = useState(false);
  const [showRelatedQuestions, setShowRelatedQuestions] = useState(false);
  const [answerToEditId, setAnswerToIdEdit] = useState(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const {userId} = useUserIdFromToken(window.localStorage.getItem('token'));
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);
  // Create a ref for UpdateAnswer
  const updateAnswerRef = useRef(null);

  useEffect(() => {
    setShowOutlet(true);
    setTimeout(() => setShowRelatedQuestions(true), 1200);
  }, [id]);

  // Scroll to the UpdateAnswer component when the answerToEditId is set
  useEffect(() => {
    if (answerToEditId && updateAnswerRef.current) {
      updateAnswerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [answerToEditId]);

  return (
    <div className="page-container mt-4">
      <div className="question-container">
        <Suspense fallback={<Spinner />}>
          <QuestionDetail setIsOwner={setIsOwner} userId={userId}/>
        </Suspense>
        {showOutlet && (
          <Suspense fallback={<SpinnerMini />}>
            <AnswersList 
              setAnswerToIdEdit={setAnswerToIdEdit} 
              setHasAnswered={setHasAnswered}
              userId={userId}
            />
          </Suspense>
        )}
        <Suspense fallback={<SpinnerMini />}>
          {answerToEditId && (
            <div ref={updateAnswerRef}>
              <UpdateAnswer questionId={id} answerId={answerToEditId} />
            </div>
          )}
          { !(hasAnswered || isOwner) && <CreateAnswer questionId={id} />}
        </Suspense>
      </div>
      {showRelatedQuestions && (
        <Suspense fallback={<SpinnerMini />}>
          <div className="related-questions-container">
            <RelatedQuestions id={id} />
          </div>
        </Suspense>
      )}
    </div>
  );
}

export default QuestionDetailPage;

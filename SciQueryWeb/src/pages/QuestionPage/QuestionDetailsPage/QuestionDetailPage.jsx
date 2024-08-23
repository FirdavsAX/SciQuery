import React, { lazy, Suspense, useEffect, useState } from "react";
import { useParams, Outlet } from "react-router-dom";
import Spinner from "../../../components/Spinner/Spinner";
import SpinnerMini from "../../../components/Spinner/SpinnerMini/SpinnerMini";
import "./QuestionDetailPage.css";
import QuestionDetail from "../../../components/Questions/QuestionDetail/QuestionDetail";

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

  useEffect(() => {
    // Ensure the outlet is shown as soon as QuestionDetail is loaded
    setShowOutlet(true);
    setTimeout(() => setShowRelatedQuestions(true), 1000); // Delay to show RelatedQuestions
  }, [id]);

  return (
    <div className="page-container mt-4">
      <div className="question-container">
        <Suspense fallback={<Spinner />}>
          <QuestionDetail />
        </Suspense>
        {showOutlet && (
          <Suspense fallback={<SpinnerMini />}>
            <Outlet />
          </Suspense>
        )}
        <Suspense fallback={<SpinnerMini />}>
          <CreateAnswer questionId={id} />
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

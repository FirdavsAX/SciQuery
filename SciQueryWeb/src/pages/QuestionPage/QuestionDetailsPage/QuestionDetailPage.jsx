import React, { lazy, Suspense, useEffect, useRef, useState } from "react";
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
  const questionDetailRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.boundingClientRect.bottom <= window.innerHeight) {
          setShowOutlet(true); // Show Outlet after QuestionDetail
          setTimeout(() => setShowRelatedQuestions(true), 1000); // Delay to show RelatedQuestions
          observer.disconnect(); // Stop observing once visible
        }
      },
      { threshold: 1.0 } // Adjust as needed
    );

    if (questionDetailRef.current) {
      observer.observe(questionDetailRef.current);
    }

    return () => {
      if (questionDetailRef.current) {
        observer.unobserve(questionDetailRef.current);
      }
    };
  }, []);

  return (
    <div className="page-container mt-4">
      <div className="question-container">
        <Suspense fallback={<Spinner />}>
          <div ref={questionDetailRef}>
            <QuestionDetail />
          </div>
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

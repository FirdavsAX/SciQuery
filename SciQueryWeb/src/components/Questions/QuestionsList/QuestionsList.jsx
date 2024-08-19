import { useFetch } from "../../hooks/useFetch";
import QuestionItem from "../QuestionItem/QuestionItem";
import Spinner from "../../Spinner/Spinner";
import NotificationComponent from "../../Notification/NotificationComponent";

function QuestionsList() {
  const {
    data: questions,
    isPending,
    error,
  } = useFetch("questions");
  return (
    <div>
<NotificationComponent/>
      {isPending && <Spinner showImg={isPending} />}
      {error && <h3>{error}</h3>}
      {questions &&
        questions.data &&
        questions.data.map((question) => {
          return (
            <div key={question.id}>
              <QuestionItem question={question} />
            </div>
          );
        })}
    </div>
  );
}

export default QuestionsList;

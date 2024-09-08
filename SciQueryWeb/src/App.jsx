import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

//pages
import Home from "./pages/Home/Home";
import RootLayout from "./layout/RootLayout";
import QuestionPage from "./pages/QuestionPage/QuestionPage";
import QuestionsList from "./components/Questions/QuestionsList/QuestionsList";
import ErrorPage from "./pages/help/ErrorPage";
import CreateAndUpdateQuestionPage from "./pages/QuestionPage/Create/CreateAndUpdateQuestionPage";
import { lazy, Suspense, useState } from "react";
const QuestionDetailPage = lazy(() =>
  import("./pages/QuestionPage/QuestionDetailsPage/QuestionDetailPage")
);
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import AnswersList from "./components/Answers/AnswersList/AnswersList";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import UserProfilePage from "./pages/ProfilePage/UserProfilePage/UserProfilePage";
import PostsPage from "./pages/Posts/PostsPage";
import MyQuestions from "./pages/Posts/MyQuestions/MyQuestions";
import MyAnswers from "./pages/Posts/MyAnswers/MyAnswers";
import MyComments from "./pages/Posts/MyComments/MyComments";
import NotificationsPage from "./pages/NotificationsPage/NotificationsPage";
import UpdatePage from "./pages/QuestionPage/Update/UpdatePage";

function App() {
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const routes = createBrowserRouter([
    {
      path: "/",
      errorElement: <ErrorPage />,
      element: token ? <RootLayout /> : <Login setToken={setToken} />,
      children: [
        { index: true, element: <Home /> },
        {
          path: "questions",
          element: <QuestionPage />,
          children: [
            { index: true, element: <QuestionsList /> },
            { path: "new", element: <CreateAndUpdateQuestionPage /> },
            { path: "edit/:id", element: <UpdatePage /> },
          ],
        },
        {
          path: "questions/:id",
          element: (
            <Suspense>
              <QuestionDetailPage />
            </Suspense>
          ),
          children: [],
        },
        {
          path: "profile",
          element: <ProfilePage />,
        },
        {
          path: "posts",
          element: <PostsPage />,
          children: [
            {
              index: true,
              element: <MyQuestions />,
            },
            {
              path: "my-answers",
              element: <MyAnswers />,
            },
            {
              path: "my-comments",
              element: <MyComments />,
            },
          ],
        },
        {
          path: "profile/:userId",
          element: <UserProfilePage />,
        },
        {
          path: "notifications/",
          element: <NotificationsPage />,
        },
      ],
    },
    {
      path: "/error",
      element: <ErrorPage />,
    },
    {
      path: "/register",
      element: <Register setToken={setToken} />,
    },
  ]);
  return (
    <div className="App">
      <div className="content-wrap">
        <RouterProvider router={routes} />
      </div>
    </div>
  );
}

export default App;

import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

//pages
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import RootLayout from "./layout/RootLayout";
import QuestionPage from "./pages/QuestionPage/QuestionPage";
import ContactLayout from "./layout/ContactLayout";
import Faq from "./pages/help/Faq";
import Form from "./pages/help/Form";
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

function App() {
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const routes = createBrowserRouter([
    {
      path: "/",
      errorElement: <ErrorPage />,
      element: token ? <RootLayout /> : <Login setToken={setToken} />,
      children: [
        { index: true, element: <Home /> },
        { path: "about", element: <About /> },
        {
          path: "questions",
          element: <QuestionPage />,
          children: [
            { index: true, element: <QuestionsList /> },
            { path: "new", element: <CreateAndUpdateQuestionPage /> },
            { path: "edit/:id", element: <CreateAndUpdateQuestionPage /> },
          ],
        },
        {
          path: "questions/:id",
          element: (
            <Suspense>
              <QuestionDetailPage />
            </Suspense>
          ),
          children: [{ index: true, element: <AnswersList /> }],
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
        {
          path: "contact/",
          element: <ContactLayout />,
          children: [
            { path: "faq", element: <Faq /> },
            { path: "form", element: <Form /> },
          ],
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

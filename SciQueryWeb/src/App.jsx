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
const QuestionDetailPage = lazy(() => import("./pages/QuestionPage/QuestionDetailsPage/QuestionDetailPage"));
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import AnswersList from "./components/Answers/AnswersList/AnswersList";
import ProfilePage from "./pages/ProfilePage/ProfilePage";


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
        { path: "questions", element: <QuestionPage />, children: [
          { index: true, element: <QuestionsList /> },
          { path: "new", element: <CreateAndUpdateQuestionPage /> },
        ]},
        { path: "questions/:id", element: <Suspense><QuestionDetailPage /></Suspense>, children: [
          { index: true, element: <AnswersList /> },
        ]},
        {
          path : 'profile',
          element : <ProfilePage/>
        },
        { path: "contact/", element: <ContactLayout />, children: [
          { path: "faq", element: <Faq /> },
          { path: "form", element: <Form /> },
        ]},
      ],
    },
    {
      path : '/error',
      element : <ErrorPage />

    },
    {
      path: "/register",
      element: <Register setToken={setToken} />,
    },
  ]);
    return (
    <div className="App">
      <RouterProvider router={routes} />
    </div>
  );
}

export default App;

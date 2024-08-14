import "./App.css";
//pages
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import RootLayout from "./layout/RootLayout";
import QuestionPage from "./pages/QuestionPage/QuestionPage";
import ContactLayout from "./layout/ContactLayout";
import AuthLayout from "./layout/AuthLayout";
import Faq from "./pages/help/Faq";
import Form from "./pages/help/Form";
import QuestionsList from "./components/Questions/QuestionsList/QuestionsList";
import QuestionDetail from "./components/Questions/QuestionDetail/QuestionDetail";
import ErrorPage from "./pages/help/ErrorPage";
import CreateAndUpdateQuestionPage from "./pages/QuestionPage/Create/CreateAndUpdateQuestionPage";
import { useState } from "react";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";


function App() {
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const routes = createBrowserRouter([
    token
      ? {
          path: "/",
          errorElement: <ErrorPage />,
          element: <RootLayout />,
          children: [
            {
              index: true,
              element: <Home />,
            },
            {
              path: "/about",
              element: <About />,
            },
            {
              path: "/questions",
              element: <QuestionPage />,
              children: [
                {
                  index: true,
                  element: <QuestionsList />,
                },
                {
                  path: ":id",
                  element: <QuestionDetail />,
                },
              ],
            },
            {
              path: "new",
              element: <CreateAndUpdateQuestionPage />,
            },
            {
              path: "/contact/",
              element: <ContactLayout />,
              children: [
                {
                  path: "faq",
                  element: <Faq />,
                },
                {
                  path: "form",
                  element: <Form />,
                },
              ],
            },
          ],
        }
      : {
          element: <AuthLayout setToken={setToken} />,
          action: () => <AuthLayout setToken={setToken} />,
          path: "/",
          children: [
            {
              index:true,
              element: <Register setToken={setToken} />,
              action: () => <Register setToken={setToken} />,
              path: "register",
            },
            {
              element: <Login setToken={setToken} />,
              action: () => <Login setToken={setToken} />,
              path: "/",
            },
          ],
        },
  ]);
  return (
    <div className="App">
      <RouterProvider router={routes} />
    </div>
  );
}

export default App;

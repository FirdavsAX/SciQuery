import "./App.css";
//pages
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import RootLayout from "./layout/RootLayout";
import QuestionPage from "./pages/QuestionPage/QuestionPage";
import ContactLayout from "./layout/ContactLayout";
import Faq from "./pages/help/Faq";
import Form from "./pages/help/Form";
import QuestionsList from "./components/Questions/QuestionsList/QuestionsList";
import QuestionDetail from "./components/Questions/QuestionDetail/QuestionDetail";
import ErrorPage from "./pages/help/ErrorPage";

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      errorElement : <ErrorPage/>,
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
    },
  ]);
  return (
    <div className="App">
      <RouterProvider router={routes} />
    </div>
  );
}

export default App;

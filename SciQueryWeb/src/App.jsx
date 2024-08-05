import "./App.css";
//pages
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";

import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";

function App() {
  const routes = createBrowserRouter(
    createRoutesFromElements(
      <Route>
      <Route path="/" element={<Home />} />
      <Route path="/About" element={<About />} />
      <Route path="/Contact" element={<Contact />} />
    </Route>
    )
  )
  return (
    <div className="App">
  
        {/* <nav>
          <h1>My Nav</h1>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/About">About</NavLink>
          <NavLink to="/Contact">Contact</NavLink>
        </nav> */}
      <RouterProvider router={routes}/>
    </div>
  );
}

export default App;

import { NavLink } from "react-router-dom";
import { useRouteError } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();
console.log(error);
  if (error.status === 404) {
    return (
      <div className="error-container">
        <h1>👇PageNotFound👇</h1>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestias
          rem corporis veritatis sint, velit at nobis eum consectetur, autem
          odio numquam tempora vel sunt, possimus atque non amet libero!
          Doloribus voluptates porro unde non soluta. Quibusdam voluptas laborum
          optio ducimus, a minus debitis amet sit accusamus, ad reiciendis, quos
          quis.
        </p>
        <NavLink to="/">Home Page</NavLink>
      </div>
    );
  } else {
    return (
      <div className="error-container">
        <h1>Something went wrong</h1>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestias
          rem corporis veritatis sint, velit at nobis eum consectetur, autem
          odio numquam tempora vel sunt, possimus atque non amet libero!
          Doloribus voluptates porro unde non soluta. Quibusdam voluptas laborum
          optio ducimus, a minus debitis amet sit accusamus, ad reiciendis, quos
          quis.
        </p>
        <NavLink to="/">Home Page</NavLink>
      </div>
    );
  }
}

export default ErrorPage;

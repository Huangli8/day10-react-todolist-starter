import TodoDetail from "./components/TodoDetail";
import "./App.css";
import TodoListGenerator from "./components/TodoListGenerator";
import {
  createBrowserRouter,
  Outlet,
  NavLink,
  RouterProvider,
  useParams,
} from "react-router";


function DefaultLayout() {
  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <NavLink to={"/"}>Home</NavLink>
            </li>
            <li>
              <NavLink to={"/todos"}>Todo List</NavLink>
            </li>
            <li>
              <NavLink to={"/about"}>About</NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <h1>xxx</h1>
        <Outlet></Outlet> {/* placeholder for child route components */}
      </main>
      <footer>footer copyright</footer>
    </>
  );
}

function ErrorPage() {
  return <div>error page</div>;
}


const routes = [
  {
    path: "/",
    element: <DefaultLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <h1>Home Page</h1>,
      },
      {
        path: "about",
        element: <h1>About Us</h1>,
      },
      {
        path: "todos",
        element: <TodoListGenerator />,
      },
      {
        path: "todos/:id",
        element: <TodoDetail />,
      },
    ],
  },
];
function App() {
  // the Hooks API manage component data state

  const router = createBrowserRouter(routes);
  return (
    <div className="App">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;

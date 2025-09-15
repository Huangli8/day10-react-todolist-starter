import TodoDetail from "./components/TodoDetail";
import "./App.css";
import TodoListGenerator from "./components/TodoListGenerator";
import {
  createBrowserRouter,
  Outlet,
  NavLink,
  RouterProvider,
  useLocation,
} from "react-router";
import { Menu, FloatButton } from "antd";
import { UpOutlined } from "@ant-design/icons";

import TodoDoneGenerator from "./components/TodoDoneGenerator";
const items = [
  { label: <NavLink to="/">Home</NavLink>, key: "/" },
  { label: <NavLink to="/todos">Todo List</NavLink>, key: "/todos" },
  { label: <NavLink to="/about">About</NavLink>, key: "/about" },
];

function DefaultLayout() {
  const location = useLocation();
  return (
    <>
      <header>
        <Menu
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={items}
        />
      </header>
      <main>
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
      {
        path: "todos/done",
        element: (
          <TodoDoneGenerator />
        ),
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
      <FloatButton
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        style={{ right: 40, bottom: 60 }}
        icon={<UpOutlined />}
      />
    </div>
  );
}

export default App;

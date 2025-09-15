import { useEffect, useState } from "react";
import { getTodoById } from "../apis/api";
import { useParams } from "react-router";
import { Button } from "antd";
import { useNavigate } from "react-router";
import ErrorPage from "./ErrorPage";
const TodoDetail = () => {
  const { id } = useParams();
  const [todo, setTodo] = useState(null);
  // console.log(id);
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    getTodoById(id)
      .then((res) => {
        // console.log(res.data);
        setTodo(res.data);
      })
      .catch((err) => setError(err));
  }, [id]);

  if (error) {
    return <ErrorPage />;
  }

  if (!todo) return <div>Loading...</div>; //这句不能删 因为res是异步得到的 如果这里删了 todo为空会报错
  return (
    <div>
      <h1>Text Detail:{todo.text}</h1>
      <Button color="cyan" variant="solid" onClick={() => navigate("/todos")}>
        返回
      </Button>
    </div>
  );
};
export default TodoDetail;

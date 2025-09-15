import { useContext, useEffect, useState } from "react";
import { TodoContext } from "../contexts/TodoContext";
import "./TodoList.css";
import { addTodo, getTodos, updateTodo,deleteTodo } from "../apis/api";
const TodoList = () => {
  const value = useContext(TodoContext);
  const { state, dispatch } = value;
  const [input, setInput] = useState("");

  // 组件挂载时获取 todos
  useEffect(() => {
    getTodos().then((res) => {
      console.log(res.data);
      dispatch({ type: "LOAD_TODOS", todos: res.data });
    });
  }, []);

  // function toggleDone(id) {
  //   const action = { type: "DONE", id: id };
  //   dispatch(action);
  // }
  const toggleDone = async (id, done) => {
    updateTodo(id, { done: !done }).then((res) => {
      dispatch({ type: "DONE", id: id });  //api方法更新后端数据 dispatch更新前端状态
    });
  };
  const handleAdd = async () => {
    if(input && input.trim()){
      const todo = {
        text: input.trim(),
        done: false,
      };
      addTodo(todo).then((res) => {
        console.log(res.data);
        dispatch({ type: "ADD", todo: res.data });
      });
      setInput("");
    }
  };
  const handleDelete = async (id) => {
    deleteTodo(id).then((res) => {
      console.log(res.data);
      dispatch({ type: "DELETE", id: id });
    });
  };

  // function handleDelete(id) {
  //   dispatch({ type: "DELETE", id: id });
  // }
  return (
    <div className={"todo-group"}>
      <div>Todo List</div>
      {state.length === 0 ? (
        <div className="empty-image-box">
          <img src="/img.jpg" className="empty-image" />
          <div>暂无待办事项</div>
        </div>
      ) : (
        state.map(({ id, text, done }) => {
          return (
            <div className="todo-item-row" key={id}>
              <div
                className={`todo-item ${done ? "done" : ""}`}
                onClick={() => toggleDone(id, done)}
              >
                {text}
              </div>
              <button className="del-btn" onClick={() => handleDelete(id)}>
                X
              </button>
            </div>
          );
        })
      )}
      <div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        ></input>
        <button className="add-btn" onClick={handleAdd}>
          Add
        </button>
      </div>
    </div>
  );
};

export default TodoList;

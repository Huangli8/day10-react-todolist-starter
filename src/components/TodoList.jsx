import { useContext, useState } from "react";
import { TodoContext } from "../contexts/TodoContext";
import "./TodoList.css";

const TodoList = () => {
  const value = useContext(TodoContext);
  const { state, dispatch } = value;
  const [input, setInput] = useState("");

  function toggleDone(id) {
    const action = { type: "DONE", id: id };
    dispatch(action);
  }
  function handleAdd() {
    dispatch({ type: "ADD", text: input });
    setInput("");
  }
  function handleDelete(id) {
    dispatch({ type: "DELETE", id: id });
  }
  return (
    <div className={"todo-group"}>
      <div>Todo List</div>
      {state.length === 0 ? (
        <div className="empty-image-box">
          <img src="/img.jpg" alt="Empty" className="empty-image"/>
          <div>暂无待办事项</div>
        </div>
      ) : (
        state.map(({ id, text, done }) => {
          return (
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div
                className={`todo-item ${done ? "done" : ""}`}
                onClick={() => toggleDone(id)}
              >
                {text}
              </div>
              <button onClick={() => handleDelete(id)}>X</button>
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
        <button onClick={handleAdd}>Add</button>
      </div>
    </div>
  );
};

export default TodoList;

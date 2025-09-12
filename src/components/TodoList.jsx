import { useContext } from "react";
import { TodoContext } from "../contexts/TodoContext";
import './TodoList.css'

const TodoList = () => {
  const value = useContext(TodoContext);
  const { state, dispatch } = value;
  return (
    <div className={'todo-group'}>
      <div>Todo List</div>
      {state.map((todo) => {
        return <div className={'todo-item'}>{todo.text}</div>;
      })}
    </div>
  );
};

export default TodoList;

import React, { useReducer } from "react";
import TodoDone from "./TodoDone";
import { initialState, todoReducer } from "../reducers/todoReducer";
import { TodoContext } from "../contexts/TodoContext";

const TodoDoneGenerator = () => {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      <TodoDone />
    </TodoContext.Provider>
  );
};
export default TodoDoneGenerator;

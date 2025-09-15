import React, { useReducer } from "react";
import TodoList from "./TodoList";
import { initialState, todoReducer } from "../reducers/todoReducer";
import { TodoContext } from "../contexts/TodoContext";

const TodoListGenerator = () => {
    const [state, dispatch] = useReducer(todoReducer, initialState);
    const value = {state, dispatch}

    return(
        <TodoContext.Provider value={{state, dispatch}}>
        <TodoList/>
      </TodoContext.Provider>
    );
}
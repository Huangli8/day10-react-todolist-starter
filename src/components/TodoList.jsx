import { useContext } from "react";
import { TodoContext } from "../contexts/TodoContext";
import './TodoList.css'

const TodoList = () => {
  const value = useContext(TodoContext);
  const { state, dispatch } = value;

  function toggleDone(id) {
    const action = {type:'DONE',id:id};
    dispatch(action)
  }
  
  return (
    <div className={'todo-group'}>
      <div>Todo List</div>
      {state.map(({id,text ,done}) => {
        return <div style={{display:'flex', justifyContent:'space-between'}}>
          <div className={`todo-item ${done?'done':''}`} onClick={()=>toggleDone(id)}>{text}</div>
          <button>X</button>
        </div>;
      })}
      <div>
        <input type="text"></input>
        <button>Add</button>
      </div>
    </div>
  );
};

export default TodoList;

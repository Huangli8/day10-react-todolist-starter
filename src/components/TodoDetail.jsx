import { useEffect,useState } from "react";
import { getTodoById } from "../apis/api";
import { useParams } from "react-router";
const TodoDetail =() => {
    const { id } = useParams();
    const [todo,setTodo] = useState(null);
    console.log(id);
  
    useEffect(()=>{
      getTodoById(id).then((res)=>{
        // console.log(res.data);
        setTodo(res.data);
      });
    },[id]);
    
    if (!todo) return <div>Loading...</div>; //这句不能删 因为res是异步得到的 如果这里删了 todo为空会报错
    return (
    <h1>Text Detail:{todo.text}</h1>

    );
  };
  export default TodoDetail;
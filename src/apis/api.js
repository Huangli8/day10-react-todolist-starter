import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://68c78c9c5d8d9f514732233a.mockapi.io',
});

export const getTodos = async()=>{
    return await instance.get('/todos');
}

export const addTodo = async(todo)=>{
    const response = await instance.post('/todos',todo);
    return response;
}

export const deleteTodo = async(id)=>{
    const response = await instance.delete(`/todos/${id}`);
    return response;
}

export const updateTodo = async(id,todo)=>{
    const response = await instance.put(`/todos/${id}`,todo);
    return response;
}

export const getTodoById = async(id)=>{
    const response = await instance.get(`/todos/${id}`);
    return response;
}
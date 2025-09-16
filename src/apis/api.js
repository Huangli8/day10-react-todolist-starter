import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080",
});

export const getTodos = async () => {
  return await instance.get("/todos");
};

export const addTodo = async (todo) => {
  const response = await instance.post("/todos", todo);
  return response;
};

export const deleteTodo = async (id) => {
  const response = await instance.delete(`/todos/${id}`);
  return response;
};

export const updateTodo = async (id, todo) => {
  const response = await instance.put(`/todos/${id}`, todo);
  return response;
};

export const getTodoById = async (id) => {
  const response = await instance.get(`/todos/${id}`);
  return response;
};

instance.interceptors.request.use(
  (config) => {
    console.log("request success", config);
    config.metadata = {
      startTime: Date.now(),
    };
    return config;
  },
  (error) => {
    //handle request error
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    // handle response
    console.log("response success", response);
    console.log(
      "Api duration is" +
        (Date.now() - response.config.metadata.startTime) +
        "ms"
    );
    return response;
  },
  (error) => {
    // handle response error
    const status = error.response?.status;
    const data = error.response?.data;
    if (error.response) {
      if (status === 401) {
        alert(`response Error ${status} ${data}`);
        console.log(error.response);
        // do something
      } else if (status === 500) {
        alert(`response Error ${status} ${data}`);
        console.log(error.response);
      } else if (status === 404) {
        alert(`response Error ${status} ${data}`);
        console.log(error.response);
      }
    } else {
      // 这里捕获网络错误、跨域等情况
      alert(
        "No response from server. Please check your network or server status."
      );
      console.error(error);
    }
    return Promise.reject(error);
  }
);

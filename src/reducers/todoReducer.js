export const initialState = [
  {id: 1, text: "the first todo", done: false},
  {id: 2, text: "the second todo", done: false},
];

// reducer is a pure function that define and gather all state update logic
export const todoReducer = (state, action) => {
  // const obj ={a,b,c} = {...obj,c}
  switch (action.type){
    case 'DONE':
      return state.map(todo => {
        if (action.id === todo.id){
          const done = !todo.done;
          return {...todo, done:done};
        }
        return todo;
      });
      case 'ADD':
        return [
          ...state,
          action.todo
        ];
      case 'DELETE':
        return state.filter(todo => action.id !== todo.id);
      case 'LOAD_TODOS':
        return action.todos;
    default:
      return state;
  }
  return state;
};

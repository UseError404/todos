import {createSlice} from "@reduxjs/toolkit";
// import { TodoService } from "../../services/db";

export const todosSlice = createSlice({
    name: 'todos',
    initialState: {
        todos: [],
        // loading: false,
    },
    reducers: {
   /*     setTodos(state, action) {
            state.todos = action.payload;
        },
        setLoading(state, action) {
            state.loading = action.payload;
        }
        */
        addTodos(state, action) {
            state.todos.push({
                id: new Date().toISOString(),
                name: action.payload.name,
                completed: false,
                priority: action.payload.priority || '',
            })
        },
        removeTodos(state, action) {
            state.todos = state.todos.filter(todo => todo.id !== action.payload.id);
        },
        removeAllTodos(state, action) {
            state.todos = [];
        },
    }
})

export const {addTodos, removeAllTodos, removeTodos} = todosSlice.actions;
export default todosSlice.reducer;
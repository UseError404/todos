import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./slice/todoSlice";
import sortReducer from "./slice/sortSlice";
import authReducer from "./slice/authSlice";

export const store = configureStore({
    reducer: {
        todos: todosReducer,
        sort: sortReducer,
        auth: authReducer
    }
});
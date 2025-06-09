import {configureStore} from "@reduxjs/toolkit";
import {todosSlice} from "./slice/todoSlice.js";
import {sortSlice} from "./slice/sortSlice.js";

export const store = configureStore({
    reducer: {
        todos: todosSlice.reducer,
        sort: sortSlice.reducer,
    }
})
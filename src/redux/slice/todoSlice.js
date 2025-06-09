import {createSlice} from "@reduxjs/toolkit";

const getTasksFromStorage = (userId) => {
    const data = localStorage.getItem(`todos_${userId}`);
    return data ? JSON.parse(data) : [];
}

const saveTasksToStorage = (userId, tasks) => {
    localStorage.setItem(`todos_${userId}`, JSON.stringify(tasks));
}


export const todosSlice = createSlice({
    name: 'todos',
    initialState: {
        items: [],
        loading: false,
    },
    reducers: {
        setTasks: (state, action) => {
            state.items = action.payload;
        },
        addTask: (state, action) => {
            const newTask = {
                id: Date.now().toString(),
                name: action.payload.name,
                priority: action.payload.priority || '',
                completed: false,
                createdAt: new Date().toISOString()
            };

            state.items.push(newTask);
            saveTasksToStorage(action.payload.userId, state.items);
        },
        removeTask:(state, action) => {
            state.items = state.items.filter(todo => todo.id !== action.payload.id);
            saveTasksToStorage(action.payload.userId, state.items);
        },
        clearCompleted: (state, action) => {
            state.items = state.items.filter(task => !task.completed);
            saveTasksToStorage(action.payload.userId, state.items);
        }
    }
});
// Асинхронные actions
export const loadTasks = (userId) => (dispatch) => {
    const tasks = getTasksFromStorage(userId);
    dispatch(todosSlice.actions.setTasks(tasks));
};

export const { setTasks, addTask, removeTask, clearCompleted } = todosSlice.actions;
export default todosSlice.reducer;
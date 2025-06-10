import {createSlice} from "@reduxjs/toolkit";

const getTasksFromStorage = (userId) => {
    const data = localStorage.getItem(`todos_${userId}`);
    return data ? JSON.parse(data) : [];
}

const saveTasksToStorage = (userId, tasks) => {
    localStorage.setItem(`todos_${userId}`, JSON.stringify(tasks));
}

// пересчёт важности по сроку
const calculatePriority = (dueDate) => {
    if(!dueDate) return '4';

    const today = new Date();
    const due = new Date(dueDate);
    const diffDays = Math.ceil((due-today) / (1000 * 60 * 60 * 24));

    if (diffDays <= 0) return '1'; // Просрочено (красный)
    if (diffDays <= 1) return '1'; // Срочно (красный)
    if (diffDays <= 3) return '2'; // Высокий (желтый)
    if (diffDays <= 7) return '3'; // Средний (зеленый)
    return '4';                    // Низкий (синий)
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
            const dueDate = action.payload.dueDate || null;
            const newTask = {
                id: Date.now().toString(),
                name: action.payload.name,
                priority: calculatePriority(dueDate),
                dueDate,
                completed: false,
                createdAt: new Date().toISOString()
            };

            state.items.push(newTask);
            saveTasksToStorage(action.payload.userId, state.items);
        },
        updateTaskPriority: (state) => {
            state.items = state.items.map(task => ({
                ...task,
                priority: calculatePriority(task.dueDate),
            }))
            saveTasksToStorage(state.userId, state.items);
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

export const { setTasks, addTask, removeTask, clearCompleted,  updateTaskPriority } = todosSlice.actions;
export default todosSlice.reducer;
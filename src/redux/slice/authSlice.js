import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userId: localStorage.getItem('userId') || null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.userId = action.payload;
            localStorage.setItem('userId', action.payload);
        },
        logout: (state) => {
            state.userId = null;
            localStorage.removeItem('userId');
            // Очищаем задачи при выходе (опционально)
            localStorage.removeItem(`todos_${localStorage.getItem('userId')}`);
        }
    }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
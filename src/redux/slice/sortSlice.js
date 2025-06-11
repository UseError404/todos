import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    sortOrder: 'asc',
}

export const sortSlice = createSlice({
    name: 'sort',
    initialState,
    reducers: {
        setSortOrder(state, action) {
            state.sortOrder = action.payload;
        }
    }
})

export const {setSortOrder} = sortSlice.actions;
export default sortSlice.reducer;

export const selectSortedTasks = (state) => {
    const { items } = state.todos;
    const { sortOrder } = state.sort;

    return [...items].sort((a, b) => {
        // Сначала сортируем по просроченным задачам (красные)
        const today = new Date();

        // Проверяем, есть ли дата у задач
        const aDueDate = a.dueDate ? new Date(a.dueDate) : null;
        const bDueDate = b.dueDate ? new Date(b.dueDate) : null;

        // Просроченные задачи идут первыми
        const aIsOverdue = aDueDate && aDueDate < today;
        const bIsOverdue = bDueDate && bDueDate < today;

        if (aIsOverdue && !bIsOverdue) return -1;
        if (!aIsOverdue && bIsOverdue) return 1;
        if (aIsOverdue && bIsOverdue) {
            // Если обе просрочены - сортируем по ближайшей дате
            return aDueDate - bDueDate;
        }

        // Для задач без даты - в конец списка
        if (!aDueDate && !bDueDate) return 0;
        if (!aDueDate) return 1;
        if (!bDueDate) return -1;

        // Сортировка по ближайшей дате
        const dateComparison = aDueDate - bDueDate;

        // Если даты одинаковые - сортируем по приоритету
        if (dateComparison === 0) {
            return sortOrder === 'asc'
                ? a.priority.localeCompare(b.priority)
                : b.priority.localeCompare(a.priority);
        }

        return sortOrder === 'asc' ? dateComparison : -dateComparison;
    });
};
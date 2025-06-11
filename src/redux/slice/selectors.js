import { createSelector } from '@reduxjs/toolkit'; // Вместо 'reselect'

// базовые селекторы
const selectTodos = (state) => state.todos.items;
const selectSortOrder = (state) => state.sort.sortOrder;

export const selectSortedTasks = createSelector(
    [selectTodos, selectSortOrder],
    (items, sortOrder) => {

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
    }
)



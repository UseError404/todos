import {memo, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import {loadTasks, removeTask, updateTaskPriority} from "../../redux/slice/todoSlice.js";
import {selectSortedTasks, setSortOrder} from "../../redux/slice/sortSlice.js";

import {Button} from "../../shared/ui/index.jsx";
import style from './style.module.scss';

export const TaskList = memo(() => {
    const dispatch = useDispatch();

    const tasks = useSelector(state => state.todos.items);
    const userId = useSelector(state => state.auth.userId);
    const sortOrder = useSelector(state => state.sort.sortOrder);

    const sortedTasks = useSelector(selectSortedTasks);  // Функция сортировки задач

    useEffect(() => {
        if (userId) {
            dispatch(loadTasks(userId))
            dispatch(updateTaskPriority()); // Обновляем приоритеты при загрузке
        }
    }, [dispatch, userId]);
    // Обновляем приоритеты каждые 6 часов
    useEffect(() => {
        const interval = setInterval(() => {
            dispatch(updateTaskPriority());
        }, 6 * 60 * 60 * 1000);
        return () => clearInterval(interval);
    }, [dispatch]);



    // отправка action на сортировку
    const toggleSortOrder = () => {
        const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        dispatch(setSortOrder(newOrder));
    };

    // сортировка приоритетности задач
    // без приоритета - в конец списка
    const getPriorityColor = (priority) => {
        switch (priority) {
            case '1':
                return style.red;
            case '2':
                return style.yellow;
            case '3':
                return style.green;
            case '4':
                return style.blue;
            default:
                return '';
        }
    };

    // удаление такска по id
    const handleDeleteTask = ({id}) => {
        dispatch(removeTask({id}));
    };

    return (
        <>
            {tasks.length > 1 &&
                <Button
                    textButton={sortOrder === 'asc' ? 'Sort Desc' : 'Sort Asc'}
                    handleFunction={toggleSortOrder}
                    className={style.sortButton}
                />
            }
            <ul className={style.taskList}>
                {sortedTasks.map(task =>
                    (
                        <li
                            key={task.id}
                            className={style.taskItem}
                            data-overdue={task.dueDate && new Date(task.dueDate) < new Date()}
                            data-priority={task.priority}
                        >
                            <div className={style.taskContainer}>
                                <div className={style.taskMainData}>
                                    <span className={`${style.taskPriority} ${getPriorityColor(task.priority)}`}></span>
                                    <span className={style.taskName}>{task.name}</span>
                                </div>
                                {task.dueDate && (
                                    <span className={style.dueDate}>
                                   |   Due: {new Date(task.dueDate).toLocaleDateString()}
                                </span>
                                )}
                            </div>
                            <Button
                                handleFunction={() => handleDeleteTask({id: task.id, userId})}
                                textButton='Del Task'
                                className={style.deleteTask}
                            />
                        </li>
                    ))
                }
            </ul>
        </>
    );
});
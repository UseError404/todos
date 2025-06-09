import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import {loadTasks, removeTask} from "../../redux/slice/todoSlice.js";
import {setSortOrder} from "../../redux/slice/sortSlice.js";

import {Button} from "../../shared/ui/index.jsx";
import style from './style.module.scss';

export const TaskList = () => {
    const dispatch = useDispatch();
    const tasks = useSelector(state => state.todos.items);
    const userId = useSelector(state => state.auth.userId);
    const sortOrder = useSelector(state => state.sort.sortOrder);

    useEffect(()=>{
        if(userId) {
            dispatch(loadTasks(userId))
        }
    }, [dispatch, userId]);


    // Функция сортировки задач
    const sortedTasks = [...tasks].sort((a, b) => {
        // Задачи без приоритета идут в конец
        if (!a.priority) return 1;
        if (!b.priority) return -1;

        return sortOrder === 'asc'
            ? a.priority.localeCompare(b.priority)
            : b.priority.localeCompare(a.priority);
    });

    // отправка action на сортировку
    const toggleSortOrder = () => {
        const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        dispatch(setSortOrder(newOrder));

        // {
        //     type: 'sort/setSortOrder',
        //         payload: sortOrder === 'asc' ? 'desc' : 'asc'
        // }
    };

    // сортировка приоритетности задач
    // без приоритета - в конец списка
    const getPriorityColor = (priority) => {
        switch (priority) {
            case '1': return style.red;
            case '2': return style.yellow;
            case '3': return style.green;
            case '4': return style.blue;
            default:  return '';
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
                {sortedTasks.map(task => (
                    <li key={task.id} className={style.taskItem}>
                        <div className={style.containerTask}>
                            <span className={`${style.taskPriority} ${getPriorityColor(task.priority)}`}></span>
                            <span className={style.taskName}>{task.name}</span>
                        </div>
                        <Button
                            handleFunction={() => handleDeleteTask({id: task.id, userId})}
                            textButton='Del Task'
                            className={style.deleteTask}
                        />
                    </li>
                ))}
            </ul>
        </>
    );
};
import style from "../../componets/TaskList/style.module.scss";
// сортировка приоритетности задач
// без приоритета - в конец списка

export const getPriorityColor = (priority) => {
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
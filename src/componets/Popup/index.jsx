import {useState} from "react";
import {useDispatch} from "react-redux";

import {Button, Input, SelectPriority, SwitchToggle} from "../../shared/ui";
import {addTodos} from "../../redux/slice/todoSlice.js";

import style from './style.module.scss';

export const Popup = ({handleTogglePopup, setTogglePopup}) => {
    const dispatch = useDispatch();

    // настройка input
    const [textInput, setInputText] = useState('');

    // настройка select (отображение приоритета задачи)
    const [priority, setPriority] = useState('');

    // настройка switchToggle (если true, то popup не будет закрыт автоматически)
    const [switchToggle, setSwitchToggle] = useState(false);
    const handleToggleSwitch = () => {
        setSwitchToggle(!switchToggle);
        console.log(switchToggle)
    }

    // отправка данных в store
    const handleDispatchTask = () => {
        if (textInput.trim() === '') return; // проверка на пустой ввод

        const newTask = {
            name: textInput,
            priority: priority,
        }

        dispatch(addTodos(newTask));
        setInputText(''); // обнуление input
        setPriority('') // обнуление select

        if (switchToggle === false) {
            setTimeout(() => handleTogglePopup(), 300)
        }
    }

    const handleClosePopup = () => {
        setTogglePopup(false);
    }

    return (
        <div className={style.popup}>
            <div className={style.content}>
                <SwitchToggle handleToggleSwitch={handleToggleSwitch}/>
                <button className={style.closePopup} onClick={()=>handleClosePopup()}>
                    <span></span>
                    <span></span>
                </button>
                <div className={style.dataTask}>
                    <SelectPriority priority={priority} setPriority={setPriority}/>
                    <Input textInput={textInput} setInputText={setInputText}/>
                </div>
                <Button handleFunction={handleDispatchTask} textButton='Add Task'/>
            </div>
        </div>
    )
}
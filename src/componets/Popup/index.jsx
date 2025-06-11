import {useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {Button, Input, SwitchToggle} from "../../shared/ui";
import {addTask} from "../../redux/slice/todoSlice.js";

import style from './style.module.scss';

export const Popup = ({handleTogglePopup, setTogglePopup}) => {
    const dispatch = useDispatch();
    const userId = useSelector(state => state.auth.userId);
    const [dueDate, setDueDate] = useState(''); // становка даты окончания задачи
    const [textInput, setInputText] = useState('');  // настройка input
    const [switchToggle, setSwitchToggle] = useState(false); // настройка switchToggle (если true, то popup не будет закрыт автоматически)
    const dateInputRef = useRef(null); // Создаем ref для input

    // Функция для открытия календаря
    const handleOpenDatePicker = () => {
        if (dateInputRef.current) {
            // Проверяем поддержку showPicker (новый API)
            if ('showPicker' in HTMLInputElement.prototype) {
                dateInputRef.current.showPicker();
            } else {
                // Fallback для старых браузеров
                dateInputRef.current.click();
            }
        }
    };
    // (если true, то popup не будет закрыт автоматически)
    const handleToggleSwitch = () => {
        setSwitchToggle(!switchToggle);
    }

    // отправка данных в store
    const handleDispatchTask = () => {
        if (textInput.trim() === '') return; // проверка на пустой ввод
        // Проверка, что дата выбрана
        const today = new Date().toISOString().split('T')[0];
        if (!dueDate || dueDate < today) {
            alert('Please select a valid future date');
            return;
        }

        const newTask = {
            name: textInput,
            dueDate,
            userId
        }

        dispatch(addTask(newTask));
        setInputText(''); // обнуление input
        setDueDate(''); // обнуление даты, если нужно

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
                <button className={style.closePopup} onClick={() => handleClosePopup()}>
                    <span></span>
                    <span></span>
                </button>
                <div className={style.dataTask}>
                    <Input textInput={textInput} setInputText={setInputText}/>
                    <div
                        className={style.formGroup}
                        onClick={handleOpenDatePicker} // Вешаем обработчик на клик
                    >
                        <label htmlFor="dueDate">Due Date</label>
                        <input
                            id="dueDate"
                            ref={dateInputRef}
                            type="date"
                            lang="en-US"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            min={new Date().toISOString().split('T')[0]}
                            style={{ opacity: 0, position: "absolute" }}
                        />

                        {dueDate && (
                            <span>{new Date(dueDate).toLocaleDateString()}</span>
                        )}
                    </div>
                </div>
                <Button handleFunction={handleDispatchTask} textButton='Add Task'/>
            </div>
        </div>
    )
}
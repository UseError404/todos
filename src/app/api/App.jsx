import {useState} from "react";

import {Popup, TaskList} from "../../componets/index.jsx";
import {Button, ThemeToggle} from "../../shared/ui/index.jsx";
import { useTheme } from '../../processes';

import style from './App.module.scss'

function App() {
    // изменение темы
    const { theme, toggleTheme } = useTheme();

    // открытие popup
    const [togglePopup, setTogglePopup] = useState(false)
    const handleTogglePopup = () => setTogglePopup(!togglePopup)


    return (
        <div className={style.todos}>
            <ThemeToggle toggleTheme={toggleTheme}/>
            <div className={style.container}>
                <Button handleFunction={handleTogglePopup}  className={style.openPopup} textButton='add task'/>
                {togglePopup && (<Popup handleTogglePopup={handleTogglePopup} setTogglePopup={setTogglePopup}/>)}
                <TaskList/>
            </div>
        </div>
    )
}

export default App

import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {Popup, TaskList} from "../../componets/index.jsx";
import {Button, ThemeToggle} from "../../shared/ui/index.jsx";

import { useTheme } from '../../processes';
import style from './App.module.scss'
import {login, logout} from "../../redux/slice/authSlice.js";

function App() {
    const dispatch = useDispatch();
    // изменение темы
    const { theme, toggleTheme } = useTheme();

    // открытие popup
    const [togglePopup, setTogglePopup] = useState(false)
    const userId = useSelector(state => state.auth.userId);
    const handleTogglePopup = () => setTogglePopup(!togglePopup)

    if (!userId) {
        return (
            <div className={style.authScreen}>

                <Button
                    className={style.loginButton}
                    textButton="Login as Demo User"
                    handleFunction={() => dispatch(login(`user_${Date.now()}`))}
                />
            </div>
        );
    }
    return (
        <div className={style.todos}>
            <div className={style.container}>
                <Button handleFunction={handleTogglePopup}  className={style.openPopup} textButton='add task'/>
                <TaskList/>
                {togglePopup && (<Popup handleTogglePopup={handleTogglePopup} setTogglePopup={setTogglePopup}/>)}
            </div>
            <ThemeToggle toggleTheme={toggleTheme}/>
            <footer>
                <Button
                    textButton="Logout"
                    handleFunction={() => dispatch(logout())}
                />
            </footer>
        </div>
    )
}

export default App

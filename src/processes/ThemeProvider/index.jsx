import {createContext, useContext, useEffect, useState} from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({children}) => {
    const [theme, setTheme] = useState('light')

    // проверка на сохраненную тему в localStorage
    useEffect(()=>{
        const savedTheme = localStorage.getItem('theme');
        if(savedTheme) setTheme(savedTheme);
    },[]);

    // обновление localeStorage при изменении темы
    // добавляем data-theme в HTML
    useEffect(()=> {
        localStorage.setItem('theme', theme);
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    }

    return (
      <ThemeContext.Provider value={{theme, toggleTheme}}>
          {children}
      </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if(!context){
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
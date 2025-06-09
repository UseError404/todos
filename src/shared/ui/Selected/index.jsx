import {useState, useEffect, useRef} from "react";
import style from './style.module.scss';

export const SelectPriority = ({priority, setPriority}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(priority);
    const dropdownRef = useRef(null);

    const options = [
        {value: "1", label: "It's important and urgent", color: style.red},
        {value: "2", label: "It's not important, but it's urgent", color: style.yellow},
        {value: "3", label: "Important, but not urgent", color: style.green},
        {value: "4", label: "It's not important and it's not urgent", color: style.blue},
    ];

    const handleSelect = (value) => {
        setSelectedValue(value);
        setPriority(value);
        setIsOpen(false);
    };

    useEffect(() => {
        setSelectedValue(priority);
    }, [priority]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return ()=>document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen])

    const selectedOption = options.find(opt => opt.value === selectedValue);

    return (
        <div className={style.customSelect} ref={dropdownRef}>
            <div
                className={`${style.colorIndicator} ${selectedOption?.color || ''}`}
                onClick={() => setIsOpen(!isOpen)}
            />

            {isOpen && (
                <div className={style.dropdown}>
                    {options.map(option => (
                        <div
                            key={option.value}
                            className={style.option}
                            onClick={() => handleSelect(option.value)}
                        >
                            <div className={`${style.optionColor} ${option.color}`}/>
                            <div className={style.label}>{option.label}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
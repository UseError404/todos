import style from './style.module.scss';

export const Button = ({handleFunction, textButton, className}) => {
    return (
        <button className={`${style.button} ${className || ''}`}
                onClick={(e) => {
                    // e.stopPropagation();
                    handleFunction();
                }}
        >
             <span className={style.circle} aria-hidden="true">
                  <span className={`${style.icon} ${style.arrow}`}/>
             </span>
            <span className={style.buttonText}>{textButton}</span>
        </button>
    );
};
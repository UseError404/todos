import style from './style.module.scss';

export const Input = ({setInputText, textInput}) => {
    return (
        <div className={style.formControl}>
            <input
                className={style.input}
                value={textInput}
                onChange={e=>setInputText(e.target.value)}
                type="text"
                required/>
            <label>
                <span style={{transitionDelay: '0ms'}}>N</span>
                <span style={{transitionDelay: '50ms'}}>a</span>
                <span style={{transitionDelay: '100ms'}}>m</span>
                <span style={{transitionDelay: '150ms'}}>e</span>
                <span> </span>
                <span style={{transitionDelay: '300ms'}}>T</span>
                <span style={{transitionDelay: '350ms'}}>a</span>
                <span style={{transitionDelay: '400ms'}}>s</span>
                <span style={{transitionDelay: '450ms'}}>k</span>
            </label>
        </div>
    );
};
import style from './style.module.scss';

export const SwitchToggle = ({handleToggleSwitch}) => {
    return (
        <div className={style.switchToggle}>
          <label className={style.switch}>
            <input type='checkbox' onClick={()=>handleToggleSwitch()}/>
            <span />
          </label>
        </div>
    );
};
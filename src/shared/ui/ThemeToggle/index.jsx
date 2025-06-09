import style from './style.module.scss';

export const ThemeToggle = ({toggleTheme}) => {
    return (
        <label
            htmlFor="themeToggle"
            className={`${style.themeToggle} ${style.stSunMoonThemeToggleBtn}`}
            type="checkbox"
        >
          <input
              type="checkbox"
              id="themeToggle"
              onClick={toggleTheme}
              className={style.themeToggleInput} />
          <svg width={18} height={18} viewBox="0 0 20 20" fill="currentColor" stroke="none">
            <mask id="moon-mask">
              <rect x={0} y={0} width={20} height={20} fill="white" />
              <circle cx={11} cy={3} r={8} fill="black" />
            </mask>
            <circle className={style.sunMoon} cx={10} cy={10} r={8} mask="url(#moon-mask)" />
            <g>
              <circle className={`${style.sunRay} ${style.sunRay1}`} cx={18} cy={10} r="1.5" />
              <circle className={`${style.sunRay} ${style.sunRay2}`} cx={14} cy="16.928" r="1.5" />
              <circle className={`${style.sunRay} ${style.sunRay3}`} cx={6} cy="16.928" r="1.5" />
              <circle className={`${style.sunRay} ${style.sunRay4}`} cx={2} cy={10} r="1.5" />
              <circle className={`${style.sunRay} ${style.sunRay5}`} cx={6} cy="3.1718" r="1.5" />
              <circle className={`${style.sunRay} ${style.sunRay6}`} cx={14} cy="3.1718" r="1.5" />
            </g>
          </svg>
        </label>
    );
};
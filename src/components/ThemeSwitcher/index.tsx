import { useContext } from 'react';

import { AppContext } from '../App/App';
import { IAppContext } from '../../types/types';

import styles from './style.module.scss';

export const ThemeSwitcher = (): JSX.Element => {

  const { theme, setTheme } = useContext(AppContext) as IAppContext;

  return (
    <div className={styles.theme_switcher}>
      <label className={
        `${styles.theme_switcher__light} icon-sun
          ${theme === 'light' ? styles.active : ''}`
      }>
        <input
          type='radio'
          value='light'
          name='theme'
          className='hidden'
          onChange={() => setTheme('light')}
        />
      </label>
      <label className={
        `${styles.theme_switcher__dark} icon-moon
          ${theme === 'dark' ? styles.active : ''}`}>
        <input
          type='radio'
          value='dark'
          name='theme'
          className='hidden'
          onChange={() => setTheme('dark')}
        />
      </label>
    </div>
  )
}


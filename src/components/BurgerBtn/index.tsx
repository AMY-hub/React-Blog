import { SetStateAction, useContext } from 'react';
import { AppContext } from '../App/App';
import { IAppContext } from '../../types/types';


import styles from './style.module.scss';

interface IBurgerProps {
    sidebarOpen: boolean,
    setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const BurgerBtn: React.FC<IBurgerProps> = ({ sidebarOpen, setSidebarOpen }) => {

    return (
        <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={sidebarOpen ?
                `${styles.arrow} ${styles.arrow_open}`
                : styles.arrow}>
            <span className={styles.left}></span>
            <span className={styles.right}></span>
        </button>
    )
}

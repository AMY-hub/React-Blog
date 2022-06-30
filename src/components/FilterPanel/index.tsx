import React, { useContext, useRef } from 'react';
import { BurgerBtn } from '../BurgerBtn';
import { useClickOutside } from '../../hooks/useClickOutside';
import { IAppContext } from '../../types/types';
import createKey from '../../utils/createKey';
import { formatFilterName } from '../../utils/formatFilterName';
import { AppContext } from '../App/App';
import { Button } from '../Button';
import styles from './style.module.scss';
import { NavLink } from 'react-router-dom';


// interface IFilterProps {
//     filter: string,
//     setFilter: React.Dispatch<React.SetStateAction<string>>,
//     sidebarOpen: boolean,
//     setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>,
// }

export const FilterPanel = () => {

    const options = [
        'all',
        'css',
        'javascript',
        'html'
    ];

    const { filter, setFilter, sidebarOpen, setSidebarOpen } = useContext(AppContext) as IAppContext;

    const sidebarRef = useRef(null);

    useClickOutside(sidebarRef, () => setSidebarOpen(false));

    const optList = options.map(opt => {
        const optName = formatFilterName(opt);
        return (<li key={createKey()}>
            <Button
                onClick={() => {
                    setFilter(opt);
                    setSidebarOpen(false);
                }}
                className={filter === opt ?
                    `${styles.filter__btn} ${styles.filter__btn_active}`
                    : styles.filter__btn}
            >
                {optName}
            </Button>
        </li>)
    })

    return (
        <div className={sidebarOpen ?
            `${styles.sidebar} ${styles.sidebar_open}`
            : styles.sidebar}
            ref={sidebarRef}>
            <BurgerBtn
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen} />
            <ul className={styles.filter}>
                {optList}
            </ul>
        </div>


    )
}

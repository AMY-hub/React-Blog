import { useContext } from 'react';
import { useFetch } from '../../hooks/useFetch';
import { IAppContext } from '../../types/types';
import createKey from '../../utils/createKey';
import { formatFilterName } from '../../utils/formatFilterName';
import { AppContext } from '../App/App';
import { Button } from '../Button';
import styles from './style.module.scss';


export const FilterPanel: React.FC = () => {

    const { filter, setFilter } = useContext(AppContext) as IAppContext;

    const options = [
        'all',
        'css',
        'javascript',
        'html'
    ];

    const optList = options.map(opt => {
        const optName = formatFilterName(opt);
        return (<li key={createKey()}>
            <Button
                onClick={() => setFilter(opt)}
                className={filter === opt ?
                    `${styles.filter__btn} ${styles.filter__btn_active}`
                    : styles.filter__btn}
            >
                {optName}
            </Button>
        </li>)
    })

    return (
        <ul className={styles.filter}>
            {optList}
        </ul>
    )
}

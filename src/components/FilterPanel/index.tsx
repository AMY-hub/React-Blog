import createKey from '../../utils/createKey';
import { Button } from '../Button';
import styles from './style.module.scss';

interface FilterProps {
    selectedPosts: string,
    setSelectedPosts: React.Dispatch<React.SetStateAction<string>>
}

export const FilterPanel: React.FC<FilterProps> = (
    { selectedPosts, setSelectedPosts }) => {

    const options = ['Latest posts', 'All posts', 'CSS posts', 'JavaScript posts', 'HTML posts'];

    const optList = options.map(opt => {

        return (<li key={createKey()}>
            <Button
                text={opt}
                onclick={() => setSelectedPosts(opt)}
                class={selectedPosts === opt ?
                    `${styles.filter__btn} ${styles.filter__btn_active}`
                    : styles.filter__btn}
            />
        </li>)
    })

    return (
        <ul className={styles.filter}>
            {optList}
        </ul>
    )
}

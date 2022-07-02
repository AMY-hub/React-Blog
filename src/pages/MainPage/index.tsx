import { FilterPanel } from '../../components/FilterPanel';
import { PostsSection } from '../../components/PostsSection';

import styles from './style.module.scss';

interface IMainPageProps {
    pagination: JSX.Element
}

export const MainPage: React.FC<IMainPageProps> = ({ pagination }) => {
    return (
        <main className={styles.main}>
            <FilterPanel />
            <PostsSection pagination={pagination} />
        </main>
    )
}

import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { IAppContext } from '../../types/types';
import { formatFilterName } from '../../utils/formatFilterName';
import { AppContext } from '../App/App';
import { PostsList } from '../PostsList';
import styles from './style.module.scss';


export const PostsSection: React.FC = () => {

    const { filter } = useContext(AppContext) as IAppContext;
    const filterName = formatFilterName(filter);

    return (
        <section className={styles.posts_panel}>
            <div className={styles.posts_panel__header}>
                <h3 className={styles.posts_panel__title}>
                    {`${filterName}:`}</h3>
                <Link to='/newpost' className={styles.post_panel__add}>
                    Add new post
                </Link>
            </div>
            <PostsList />
        </section>
    )
}

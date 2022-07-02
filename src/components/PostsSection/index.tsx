import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { AppContext } from '../App/App';
import { IAppContext } from '../../types/types';
import { formatFilterName } from '../../utils/formatFilterName';

import { PostsList } from '../PostsList';

import styles from './style.module.scss';

interface IPostsSectionProps {
    pagination: JSX.Element
}

export const PostsSection: React.FC<IPostsSectionProps> = ({ pagination }) => {

    const { filter } = useContext(AppContext) as IAppContext;
    const filterName = formatFilterName(filter);

    return (
        <section className={styles.posts_section}>
            <div className={styles.posts_section__header}>
                <h3 className={styles.posts_section__title}>
                    {`${filterName}:`}</h3>
                <Link to='/newpost' className={styles.post_section__add}>
                    Add new post
                </Link>
            </div>
            <PostsList />
            {pagination}
        </section>
    )
}

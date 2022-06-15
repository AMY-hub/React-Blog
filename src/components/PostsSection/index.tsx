import { Link } from 'react-router-dom';
import { Button } from '../Button';
import { PostsList } from '../PostsList';
import styles from './style.module.scss';

interface PSectionProps {
    selectedPosts: string
}

export const PostsSection: React.FC<PSectionProps> = ({ selectedPosts }) => {

    return (
        <section className={styles.posts_panel}>
            <div className={styles.posts_panel__header}>
                <h3 className={styles.posts_panel__title}>
                    {`${selectedPosts}:`}</h3>
                <Link to='/newpost' className={styles.post_panel__add}>
                    Add new post
                </Link>
            </div>
            <PostsList />
        </section>
    )
}

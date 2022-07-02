import { useContext } from 'react';

import { IAppContext } from '../../types/types';
import { AppContext } from '../App/App';

import { PostPreview } from '../PostPreview';
import { Preloader } from '../Preloader';

import styles from './style.module.scss';

export const PostsList = () => {

    const { posts } = useContext(AppContext) as IAppContext;

    return (
        <section className={styles.posts}>
            {posts ?
                posts.map(post => <PostPreview key={post.id} post={post} />)
                : <Preloader />
            }
        </section>
    )
}


import { useContext } from 'react';
import { IAppContext } from '../../types/types';
import { AppContext } from '../App/App';
import { PostPreview } from '../PostPreview';
import { Preloader } from '../Preloader';
import styles from './style.module.scss';

export const PostsList = () => {

    const { selectedPosts } = useContext(AppContext) as IAppContext;
    console.log(selectedPosts);

    return (
        <section className={styles.posts}>
            {selectedPosts ?
                selectedPosts.map(post => <PostPreview key={post.id} post={post} />)
                : <Preloader />
            }
        </section>
    )
}

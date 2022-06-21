
import { useParams } from 'react-router-dom';
import { PostFooter } from '../../components/PostFooter';
import { Preloader } from '../../components/Preloader';
import { mainPath } from '../../consts/path';
import { useFetch } from '../../hooks/useFetch';
import { IPost } from '../../types/types';

import parse from 'html-react-parser';

import styles from './style.module.scss';

export const PostDetailsPage = () => {

    const { id } = useParams();

    const { data, error, loading } = useFetch(mainPath + '/posts/' + id);
    const post = data as IPost;

    return (
        <div className={styles.wrapper}>
            {loading && <Preloader />}
            {error && <h2>{`Error: ${error}`}</h2>}
            {post && (
                <article className={styles.post}>
                    <h2 className={styles.post__title}>{post.title}</h2>
                    <div className={styles.post__body}>{parse(post.body)}</div>
                    <PostFooter
                        author={post.author}
                        topics={post.topics}
                        date={post.createdAt} />
                </article>
            )}
        </div>
    )
}
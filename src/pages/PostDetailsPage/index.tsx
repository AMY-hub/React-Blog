import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import parse from 'html-react-parser';

import { mainPath } from '../../consts/path';
import { useFetch } from '../../hooks/useFetch';
import { IAppContext, IPost } from '../../types/types';
import { AppContext } from '../../components/App/App';

import { PostFooter } from '../../components/PostFooter';
import { Preloader } from '../../components/Preloader';
import { ErrorMessage } from '../../components/ErrorMessage';

import styles from './style.module.scss';

export const PostDetailsPage = () => {

    const { id } = useParams();
    const { updatePostsList } = useContext(AppContext) as IAppContext;

    const { data, error, loading } = useFetch({
        url: mainPath + '/posts/' + id,
        state: updatePostsList
    });
    const post = data as IPost;

    return (
        <div className={styles.wrapper}>
            {loading && <Preloader />}
            {error && <ErrorMessage text={error} />}
            {post && (
                <article className={styles.post}>
                    <h2 className={styles.post__title}>{post.title}</h2>
                    <div className={styles.post__body}>{parse(post.body)}</div>
                    <PostFooter
                        author={post.author}
                        topic={post.topic}
                        date={post.createdAt}
                        id={post.id}
                        authorId={post.authorId} />
                </article>
            )}
        </div>
    )
}
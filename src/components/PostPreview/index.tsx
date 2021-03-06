import { Link } from 'react-router-dom';
import parse from 'html-react-parser';

import { IPost } from '../../types/types';

import { PostFooter } from '../PostFooter';

import styles from './style.module.scss';

interface IPostPreview {
    post: IPost
}

export const PostPreview: React.FC<IPostPreview> = ({ post }) => {
    return (
        <article className={styles.preview}>
            <h2 className={styles.preview__title}>{post.title}</h2>
            <div className={styles.preview__excerpt}>{parse(post.preview)}</div>
            <Link
                to={`/posts/${post.id}`}
                className={`${styles.preview__readmore} icon-readmore`}
            >Read more</Link>
            <PostFooter
                author={post.author}
                topic={post.topic}
                date={post.createdAt}
                id={post.id}
                authorId={post.authorId} />
        </article>
    )
}

import { useContext } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { AppContext } from '../../components/App/App';
import { ErrorMessage } from '../../components/ErrorMessage';
import { Preloader } from '../../components/Preloader';
import { mainPath } from '../../consts/path';
import { useFetch } from '../../hooks/useFetch';
import { IAppContext, IPost } from '../../types/types';

import styles from './style.module.scss';

export const EditPostPage = () => {

    const { id } = useParams();

    const { user, updatePostsList } = useContext(AppContext) as IAppContext;

    const { data, error, loading } = useFetch(`${mainPath}/posts?id=${id}&authorId=${user?.id}`, updatePostsList);
    const post = data as IPost[];
    console.log(post);

    return (
        <div>
            {loading && <Preloader />}
            {error && <ErrorMessage text={error} />}
            {post && post.length &&
                <h2>Edit</h2>
            }
        </div>
    )
}

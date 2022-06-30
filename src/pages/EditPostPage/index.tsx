import { useContext, useLayoutEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PostForm } from '../../components/PostForm';
import { AppContext } from '../../components/App/App';
import { Button } from '../../components/Button';
import { ErrorMessage } from '../../components/ErrorMessage';
import { Preloader } from '../../components/Preloader';
import { IAppContext } from '../../types/types';
import { deleteData } from '../../utils/deleteData';

import styles from './style.module.scss';
import { NotFound } from '../NotFound';
import { confirmAlert } from 'react-confirm-alert';
import { Modal } from '../../components/Modal';

export const EditPostPage = () => {

    const [isSuccess, setSuccess] = useState(false);
    const [isPending, setPending] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { theme, user, posts, updatePostsList, setUpdatePostsList } = useContext(AppContext) as IAppContext;
    const navigate = useNavigate();

    useLayoutEffect(() => {
        if (isSuccess) {
            navigate('/successfully')
        }
    })

    const { id } = useParams();

    if (!id) {
        return <NotFound />
    }

    const post = posts.find((post) => post.id === +id && +post.authorId === user?.id);
    if (!post) {
        setError("Couldn't find this post or you don't have access to it.")
    }

    console.log(post);

    const handleConfirm = (onClose: () => void) => {
        deleteData(post!.id, user, setError,
            () => setUpdatePostsList(!updatePostsList));
        onClose();
        if (!error) navigate('/')
    }

    const handleDelete = () => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <Modal
                        onClose={onClose}
                        message='Do you really want to delete this post?'
                        callback={handleConfirm}
                        theme={theme} />
                );
            }
        });
    }

    return (
        <>
            {isPending && <Preloader />}
            {error && <ErrorMessage text={error} />}
            {post &&
                <div className={styles.editform_container}>
                    <Button
                        className={styles.delete_btn}
                        onClick={handleDelete}>
                        Delete post
                    </Button>
                    <PostForm
                        isPending={isPending}
                        setPending={setPending}
                        setError={setError}
                        setSuccess={setSuccess}
                        postForEdit={post} />
                </div>
            }
        </>
    )
}

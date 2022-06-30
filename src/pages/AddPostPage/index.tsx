import { useLayoutEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ErrorMessage } from '../../components/ErrorMessage';
import { PostForm } from '../../components/PostForm';

export const AddPostPage = () => {

    const [isSuccess, setSuccess] = useState(false);
    const [isPending, setPending] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    useLayoutEffect(() => {
        if (isSuccess) {
            navigate('/successfully')
        }
    })

    return (
        <>
            <PostForm
                isPending={isPending}
                setPending={setPending}
                setError={setError}
                setSuccess={setSuccess} />
            {
                error &&
                <ErrorMessage text={error} />
            }
        </>

    )
}

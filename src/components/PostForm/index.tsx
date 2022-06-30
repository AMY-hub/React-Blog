import { useContext, useState } from 'react';
import { AppContext } from '../App/App';
import { ErrorMessage } from '../ErrorMessage';
import { SubmitButton } from '../SubmitButton';
import { TextEditor } from '../TextEditor';
import { IAppContext, IPost } from '../../types/types';
import { postData } from '../../utils/postData';
import { validatePostData } from '../../utils/validatePostData';

import styles from './style.module.scss';
import { putData } from '../../utils/putData';

interface IPostFormProps {
    isPending: boolean,
    setPending: React.Dispatch<React.SetStateAction<boolean>>,
    setError: React.Dispatch<React.SetStateAction<string | null>>,
    setSuccess: React.Dispatch<React.SetStateAction<boolean>>,
    postForEdit?: IPost
}

export const PostForm: React.FC<IPostFormProps> = ({ isPending, setPending, setError, setSuccess, postForEdit }) => {

    const [title, setTitle] = useState(postForEdit ?
        postForEdit.title : '');
    const [bodyHTML, setBodyHTML] = useState(postForEdit ?
        postForEdit.body : '');
    const [previewHTML, setPreviewHTML] = useState(postForEdit ?
        postForEdit.preview : '');
    const [topic, setTopic] = useState(postForEdit ?
        postForEdit.topic : 'html');
    const [validationError, setValidationError] = useState<string | null>(null);

    const { user } = useContext(AppContext) as IAppContext;

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        const post = {
            title: title,
            body: bodyHTML,
            preview: previewHTML,
            topic,
            author: user?.name,
            authorId: user?.id
        };
        const validate = validatePostData(post);
        if (validate.invalid) {
            setValidationError('Fill in all the fields!');
            return;
        } else {
            setValidationError(null);
        }
        if (postForEdit) {
            putData(postForEdit.id, post, user, setPending, setError, setSuccess);
        } else {
            postData(post, user, setPending, setError, setSuccess);
        }
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.form__fields}>
                <label>
                    <p className={styles.form__name}>Title of your post:</p>
                    <input type='text'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder='Your title here'
                        className={styles.form__title} />
                </label>
                <p className={styles.form__name}>Text of your post:</p>
                <TextEditor
                    bodyHTML={bodyHTML}
                    setBodyHTML={setBodyHTML}
                    previewHTML={previewHTML}
                    setPreviewHTML={setPreviewHTML}
                />
                <label className={styles.form__label}>
                    <p className={styles.form__name}>Choose theme:</p>
                    <select name='topics' value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        className={styles.form__select}>
                        <option value='html'>HTML</option>
                        <option value='css'>CSS</option>
                        <option value='javascript'>JavaScript</option>
                    </select>
                </label>
            </div>
            {validationError &&
                <ErrorMessage text={validationError} />
            }
            <SubmitButton
                loading={isPending}
                className={styles.form__submit}>
                Publish
            </SubmitButton>
        </form>
    )
}

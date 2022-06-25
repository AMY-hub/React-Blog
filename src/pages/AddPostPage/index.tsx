import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../components/App/App';
import { ErrorMessage } from '../../components/ErrorMessage';
import { SubmitButton } from '../../components/SubmitButton';
import { TextEditor } from '../../components/TextEditor';
import { mainPath } from '../../consts/path';
import { IAppContext } from '../../types/types';
import createKey from '../../utils/createKey';
import { validatePostData } from '../../utils/validatePostData';

import styles from './style.module.scss';

export const AddPostPage = () => {
    const [title, setTitle] = useState<string>('');
    const [bodyHTML, setBodyHTML] = useState<string>('');
    const [previewHTML, setPreviewHTML] = useState<string>('');
    const [topics, setTopics] = useState<Array<string>>([]);
    const [isPending, setPending] = useState<boolean>(false);
    const [isError, setIsError] = useState<string | null>(null);

    const { user } = useContext(AppContext) as IAppContext;

    const navigate = useNavigate();

    const onChangeTopic: React.ChangeEventHandler<HTMLSelectElement> = (e) => {

        const selectedOptions = e.currentTarget.selectedOptions;
        const newTopics = [];
        for (let i = 0; i < selectedOptions.length; i++) {
            newTopics.push(selectedOptions[i].value);
        }
        setTopics(newTopics);
    }

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        setPending(true);
        const post = {
            title: title,
            body: bodyHTML,
            preview: previewHTML,
            topics,
            author: user?.name,
            userId: user?.id
        };
        const validate = validatePostData(post);
        if (validate.invalid) {
            setIsError('Fill in all the fields!');
            setPending(false);
            return;
        }
        fetch(mainPath + `/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user?.accessToken}`
            },
            body: JSON.stringify(post)
        }).then(res => {
            console.log(res);
            if (res.ok === true) {
                setPending(false);
                navigate('/successfully')
            } else {
                throw new Error(`Error: couldn't create post`);
            }
        }).catch((err: Error) => {
            setIsError(err.message);
            setPending(false)
        })
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
                    <p className={styles.form__name}>Choose theme:
                        {topics &&
                            topics.map(topic => <span
                                key={createKey()}
                                className={styles.topic}>{topic}
                            </span>)}
                    </p>
                    <select name='topics' multiple
                        onChange={onChangeTopic}
                        className={styles.form__select}>
                        <option value='html'>HTML</option>
                        <option value='css'>CSS</option>
                        <option value='javascript'>JavaScript</option>
                    </select>
                </label>
            </div>
            {isError &&
                <ErrorMessage text={isError} />
            }
            <SubmitButton
                loading={isPending}
                className={styles.form__submit}
            >
                Create Post
            </SubmitButton>
        </form>
    )
}

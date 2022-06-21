import { useState } from 'react';
import { ErrorMessage } from '../../components/ErrorMessage';
import { TextEditor } from '../../components/TextEditor';
import { mainPath } from '../../consts/path';
import createKey from '../../utils/createKey';
import styles from './style.module.scss';

export const AddPostPage = () => {

    const [title, setTitle] = useState<string>('');
    const [bodyHTML, setBodyHTML] = useState<string>('');
    const [topics, setTopics] = useState<Array<string> | null>(null);
    const [isPending, setPending] = useState<boolean>(false);
    const [isError, setIsError] = useState<string | null>(null);

    const onChangeTopic = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOptions = event.currentTarget.selectedOptions;
        const newTopics = [];
        for (let i = 0; i < selectedOptions.length; i++) {
            newTopics.push(selectedOptions[i].value);
        }
        setTopics(newTopics);
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const post = { title, body: bodyHTML, topics, author: 'Amy' };
        setPending(true);

        fetch(mainPath + '/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(post)
        }).then(res => {
            console.log(res);
            if (res.ok === true) {
                setPending(false);
            } else {
                throw new Error(`Error: couldn't create post`)
            }
        }).catch((err: Error) => {
            setIsError(err.message);
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
                <TextEditor bodyHTML={bodyHTML} setBodyHTML={setBodyHTML} />
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
                <ErrorMessage text={isError} />}
            {isPending ?
                <button disabled type='submit' className={styles.form__submit}>
                    Create post
                </button>
                :
                <button type='submit' className={styles.form__submit}>
                    Create post
                </button>
            }
        </form>
    )
}

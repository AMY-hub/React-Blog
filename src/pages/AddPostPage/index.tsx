import { useState } from 'react';
import { ErrorMessage } from '../../components/ErrorMessage';
import { mainPath } from '../../consts/path';
import createKey from '../../utils/createKey';
import styles from './style.module.scss';

export const AddPostPage = () => {

    const [title, setTitle] = useState<string>('');
    const [body, setBody] = useState<string>('');
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
        const post = { title, body, topics, author: 'Amy' };
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
                <label className={styles.form__label}>
                    <p>Title of your post:</p>
                    <input type='text'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder='Your title here'
                        className={styles.form__title} />
                </label>
                <label className={styles.form__label}>
                    <p>Text of your post:</p>
                    <textarea
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        placeholder='Your text here'
                        className={styles.form__body}
                        rows={15} />
                </label>
                <label className={styles.form__label}>
                    <p>Choose theme:
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

import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { mainPath } from '../../consts/path';
import { IAppContext, IUserFormData } from '../../types/types';
import { AppContext } from '../App/App';

import { ErrorMessage } from '../ErrorMessage';
import { SubmitButton } from '../SubmitButton';

import styles from './style.module.scss';

export const SighUpForm: React.FC = () => {

    const { setUser } = useContext(AppContext) as IAppContext;
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<IUserFormData>({
        email: '', password: '', name: ''
    })
    const navigate = useNavigate();

    const handleSubmit: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const signUp: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        setLoading(true);
        fetch(mainPath + '/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.user) {
                    setUser({
                        ...data.user,
                        accessToken: data.accessToken,
                        createdAt: Date.now()
                    });
                    navigate('/');
                } else if (data === 'Email already exists') {
                    throw new Error(data);
                } else {
                    throw new Error('Something went wrong...')
                }
            })
            .catch((err: Error) => setError(err.message))
            .finally(() => setLoading(false))

    }

    return (
        <>
            {error && <ErrorMessage text={error} />}
            <form onSubmit={signUp}
                className={styles.signup__form}>
                <label>
                    <p>Enter your name:</p>
                    <input
                        onChange={handleSubmit}
                        type='text'
                        name='name'
                        required />
                </label>
                <label>
                    <p>Enter your email:</p>
                    <input
                        onChange={handleSubmit}
                        type='email'
                        name='email'
                        required />
                </label>
                <label>
                    <p>Enter your password:</p>
                    <input
                        onChange={handleSubmit}
                        type='password'
                        name='password'
                        required
                        minLength={6} />
                </label>
                <SubmitButton
                    loading={loading}
                    className={styles.signup__submit}>
                    Sign up
                </SubmitButton>
            </form>
        </>)
}
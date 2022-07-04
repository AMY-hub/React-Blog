import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { mainPath } from '../../consts/path';
import { IAppContext, IUserFormData } from '../../types/types';
import { login } from '../../utils/login';
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
    });

    const navigate = useNavigate();

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const signUp: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        login(`${mainPath}/register`, formData, setUser, setLoading, setError, navigate);
    }

    return (
        <>
            {error && <ErrorMessage text={error} />}
            <form onSubmit={signUp}
                className={styles.signup__form}>
                <label>
                    <p>Enter your name:</p>
                    <input
                        onChange={handleChange}
                        type='text'
                        name='name'
                        required />
                </label>
                <label>
                    <p>Enter your email:</p>
                    <input
                        onChange={handleChange}
                        type='email'
                        name='email'
                        required />
                </label>
                <label>
                    <p>Enter your password:</p>
                    <input
                        onChange={handleChange}
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
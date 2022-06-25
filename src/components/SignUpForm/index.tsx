import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { mainPath } from '../../consts/path';
import { IAppContext, IUserFormData } from '../../types/types';
import { AppContext } from '../App/App';
import styles from './style.module.scss';

export const SighUpForm: React.FC = () => {

    const { setUser } = useContext(AppContext) as IAppContext;
    const [formData, setFormData] = useState<IUserFormData>({
        email: '', password: '', name: ''
    })
    const navigate = useNavigate();

    const handleSubmit: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        console.log(formData);

    }
    const signUp: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        fetch(mainPath + '/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);

                setUser(data.user);
                navigate('/');
            })
            .catch((err: Error) => console.log(err.message))
    }

    return (
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
            <button type='submit' className={styles.signup__submit}>
                Sign up
            </button>
        </form>
    )
}
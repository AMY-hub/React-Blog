import { useState } from 'react';
import { Button } from '../../components/Button';
import styles from './style.module.scss';

export const LoginPage = () => {
    const [option, setOption] = useState<'signin' | 'signup'>('signin');

    const handleSubmit = () => {
        console.log("Submit");
    }

    return (
        <section className={styles.login}>
            <div className={styles.options}>
                <Button
                    class={`${option === 'signup' ?
                        styles.options__signin
                        : styles.options__signin + ' ' + styles.active}`}
                    text='Sign in'
                    onclick={() => setOption('signin')}
                />
                <Button
                    class={`${option === 'signin' ?
                        styles.options__signup
                        : styles.options__signup + ' ' + styles.active}`}
                    text='Sign up'
                    onclick={() => setOption('signup')}
                />
            </div>
            <form onSubmit={handleSubmit}
                className={styles.login__form}>
                {option === 'signup' &&
                    <label>
                        <p>Enter your name:</p>
                        <input type='text'></input>
                    </label>
                }
                <label>
                    <p>Enter your email:</p>
                    <input type='email'></input>
                </label>
                <label>
                    <p>Enter your password:</p>
                    <input type='password'></input>
                </label>
                <button type='submit' className={styles.login__submit}>
                    {option === 'signup' ? 'Sign up' : 'Sign in'}
                </button>
            </form>
        </section>
    )
}

import { useState } from 'react';
import { Button } from '../../components/Button';
import { SighInForm } from '../../components/SignInForm';
import { SighUpForm } from '../../components/SignUpForm';
import styles from './style.module.scss';

export const LoginPage = () => {
    const [option, setOption] = useState<'signin' | 'signup'>('signin');

    return (
        <section className={styles.login}>
            <div className={styles.options}>
                <Button
                    className={`${option === 'signup' ?
                        styles.options__signin
                        : styles.options__signin + ' ' + styles.active}`}
                    onClick={() => setOption('signin')}
                >Sign in
                </Button>
                <Button
                    className={`${option === 'signin' ?
                        styles.options__signup
                        : styles.options__signup + ' ' + styles.active}`}
                    onClick={() => setOption('signup')}
                >Sign up</Button>
            </div>
            {
                option === 'signin' ?
                    <SighInForm />
                    :
                    <SighUpForm />
            }
        </section>
    )
}

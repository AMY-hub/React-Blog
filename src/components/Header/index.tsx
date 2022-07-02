import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { AppContext } from '../App/App';
import { ReactComponent as Logo } from '../../images/web.svg';
import { IAppContext } from '../../types/types';

import { ThemeSwitcher } from '../ThemeSwitcher';
import { Button } from '../Button';

import styles from './style.module.scss';

export const Header: React.FC = () => {

    const { user, setUser } = useContext(AppContext) as IAppContext;

    return (
        <header className={styles.header}>
            <div className={styles.header__container}>
                <div className={styles.header__logo}>
                    <Logo className={styles.logo}></Logo>
                    <Link to='/' className={styles.header__name}>
                        WeBlog
                    </Link>
                </div>
                <ThemeSwitcher />
            </div>
            <div className={styles.header__user}>
                {user &&
                    <p className={styles.header__greeting}>{`Hello, ${user.name}!`}</p>}
                {user ?
                    <Button
                        onClick={() => setUser(null)}
                        className={styles.logout_btn}
                    >Logout</Button>
                    :
                    <Link
                        to='/login'
                        className={styles.login_link}
                    >Login</Link>
                }
            </div>
        </header>
    )
}

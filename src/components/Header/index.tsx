
import styles from './style.module.scss';

import { ReactComponent as Logo } from '../../images/web.svg';
import { ThemeSwitcher } from '../ThemeSwitcher';
import { Link } from 'react-router-dom';
import { IAppContext } from '../../types/types';
import { AppContext } from '../App/App';
import { useContext } from 'react';
import { Button } from '../Button';

export const Header: React.FC = () => {

    const { user, setUser } = useContext(AppContext) as IAppContext;

    return (
        <header className={styles.header}>
            <div className={styles.header__container}>
                <div className={styles.header__logo}>
                    <Logo className={styles.logo}></Logo>
                    <Link to='/' className={styles.header__name}>
                        Blog
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


import styles from './style.module.scss';

import { ReactComponent as Logo } from '../../images/web.svg';
import { ThemeSwitcher } from '../ThemeSwitcher';
import { Link } from 'react-router-dom';

export function Header(): JSX.Element {
    return (
        <header className={styles.header}>
            <div className={styles.header__logo}>
                <Logo className={styles.logo}></Logo>
                <Link to='/' className={styles.header__name}>
                    Blog
                </Link>
            </div>
            <div className={styles.header__options}>
                <ThemeSwitcher />
                <Link
                    to='/login'
                    className={styles.login_link}
                >Login</Link>
            </div>

        </header>
    )
}

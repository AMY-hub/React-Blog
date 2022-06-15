import { Link } from 'react-router-dom';
import styles from './style.module.scss';

export const NotFound = () => {
    return (
        <div className={styles.notfound}>
            <h2>Ooops!</h2>
            <p>This page doesn't exist.</p>
            <Link
                className={styles.homelink}
                to='/'>Go to homepage</Link>
        </div>
    )
}

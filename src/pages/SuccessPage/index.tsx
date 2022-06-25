import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../components/App/App';
import { IAppContext } from '../../types/types';
import styles from './style.module.scss';

export const SuccessPage = () => {

    const { updatePostsList, setUpdatePostsList } = useContext(AppContext) as IAppContext;

    return (
        <div className={styles.success}>
            <h2>Your post was successfully created!</h2>
            <p>You can return to the main page: </p>
            <Link
                onClick={() => setUpdatePostsList(!updatePostsList)}
                className={styles.homelink}
                to='/'>Go to homepage</Link>
            <p>Or create another one:</p>
            <Link
                className={styles.addpost}
                to='/newpost'>Add post</Link>
        </div>
    )
}
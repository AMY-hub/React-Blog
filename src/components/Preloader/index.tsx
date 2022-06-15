import styles from './style.module.scss';

export const Preloader = () => {
    return (
        <div className={styles.wrapper}>
            <p className={styles.wrapper__title}>Loading...</p>
            <div className={styles.preloader}>
                <div></div><div></div><div></div>
            </div>
        </div>

    )
}

import styles from './style.module.scss';

interface IErrorProps {
    text: string
}

export const ErrorMessage = ({ text }: IErrorProps) => {
    return (
        <div className={styles.error}>{`Error: ${text}`}</div>
    )
}

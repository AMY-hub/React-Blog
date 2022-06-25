import styles from './style.module.scss';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = ({ className, onClick, children, ...rest }) => {
    return (
        <button
            className={`${className || ''} ${styles.btn}`}
            onClick={onClick}
            {...rest}>
            {children}
        </button>
    )
}


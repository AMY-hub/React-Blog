import styles from './style.module.scss';

interface IbtpProps {
    class?: string,
    text?: string,
    onclick: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export const Button: React.FC<IbtpProps> = (props) => {
    return (
        <button
            className={`${props.class || ''} ${styles.btn}`}
            onClick={props.onclick}>
            {props.text || ''}
        </button>
    )
}


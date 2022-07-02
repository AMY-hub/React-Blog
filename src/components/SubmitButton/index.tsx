import { Button, ButtonProps } from '../Button';

import styles from './style.module.scss';

type SubmitBtnProps = ButtonProps & { loading: boolean };

export const SubmitButton: React.FC<SubmitBtnProps> = ({ loading, children, className }) => {
    return (
        <Button
            type='submit'
            className={className}
            disabled={loading}
        >
            {
                loading ?
                    <div className={styles.loader}>
                        <div></div><div></div><div></div><div></div>
                    </div>
                    :
                    children
            }
        </Button>
    )
}

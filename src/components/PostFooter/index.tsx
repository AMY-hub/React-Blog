import { getDateString } from '../../utils/getDateString';
import styles from './style.module.scss';

interface IPostFooterProps {
    author: string,
    topics: string[],
    date: number
}

export const PostFooter = ({ author, topics, date }: IPostFooterProps) => {
    return (
        <div className={styles.footer}>
            <div>
                <span>{`Author: ${author}`}</span>
                <br />
                <span>{`Topics: ${topics}`}</span>
            </div>
            <span>{`Date: ${getDateString(date)}`}</span>
        </div>
    )
}

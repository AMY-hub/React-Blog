import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { IAppContext } from '../../types/types';
import { getDateString } from '../../utils/getDateString';
import { AppContext } from '../App/App';
import styles from './style.module.scss';

interface IPostFooterProps {
    author: string,
    topic: string,
    date: number
    id: number
    authorId: string
}

export const PostFooter = ({ author, topic, date, id, authorId }: IPostFooterProps) => {

    const { user } = useContext(AppContext) as IAppContext;

    return (
        <div className={styles.footer}>
            <div>
                <span>{`Author: ${author}`}</span>
                <br />
                <span>{`Topic: ${topic}`}</span>
            </div>
            <span>{`Date: ${getDateString(date)}`}</span>
            {(+authorId === user?.id) &&
                <Link to={`/editpost/${id}`}
                    className={styles.footer__edit}
                >Edit post</Link>
            }

        </div>
    )
}

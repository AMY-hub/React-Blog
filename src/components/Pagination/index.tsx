import { Link } from 'react-router-dom';

import styles from './style.module.scss';

interface IPaginationProps {
    currentPage: number,
    pagesCount: number,
    setPage: (n: number) => void,
    getNextPage: () => void,
    getPrevPage: () => void,
}

export const Pagination: React.FC<IPaginationProps> = ({ currentPage, pagesCount, setPage, getNextPage, getPrevPage }) => {

    const pageNums = [];
    for (let i = 1; i <= pagesCount; i++) {
        pageNums.push(i);
    }
    const pages = pageNums.map(num => {
        return (
            <Link
                className={currentPage === num ?
                    `${styles.pagination__page} ${styles.active}`
                    : styles.pagination__page}
                key={num}
                onClick={() => setPage(num)}
                to={`/?page=${num}`}>
                {num}
            </Link >
        )
    });

    return (
        <div className={styles.pagination}>
            {pages.length > 1 &&
                <>
                    <Link
                        to={`/?page=${currentPage === 1 ? 1 : currentPage - 1}`}
                        onClick={getPrevPage}
                        className={currentPage === 1 ?
                            `${styles.pagination__prev} icon-arrow ${styles.disabled}`
                            : `${styles.pagination__prev} icon-arrow`}
                    ></Link>
                    {pages}
                    <Link
                        to={`/?page=${currentPage === pagesCount ? pagesCount : currentPage + 1}`}
                        onClick={getNextPage}
                        className={currentPage === pageNums.length ?
                            `${styles.pagination__next} icon-arrow ${styles.disabled}`
                            : `${styles.pagination__next} icon-arrow`}
                    ></Link>
                </>
            }
        </div>
    )
}

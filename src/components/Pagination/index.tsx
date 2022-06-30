import styles from './style.module.scss';

import React from 'react'
import { Link, NavLink } from 'react-router-dom';

interface IPaginationProps {
    currentPage: number,
    pagesCount: number,
    setPage: (n: number) => void,
    getNextPage: () => void;
    getPrevPage: () => void;
}

export const Pagination: React.FC<IPaginationProps> = ({ currentPage, pagesCount, setPage, getNextPage, getPrevPage }) => {

    const pageNums = [];
    for (let i = 1; i <= pagesCount; i++) {
        pageNums.push(i);
    }
    const pages = pageNums.map(num => {
        return (
            <NavLink
                key={num}
                onClick={() => setPage(num)}
                to={`/?page=${num}`}>
                {num}
            </NavLink>
        )
    })

    return (
        <div>
            {pages.length > 1 &&
                <>
                    <Link
                        to={`/?page=${currentPage === 1 ? 1 : currentPage - 1}`}
                        onClick={getPrevPage}
                    >Prev</Link>
                    {pages}
                    <Link
                        to={`/?page=${currentPage === pagesCount ? pagesCount : currentPage + 1}`}
                        onClick={getNextPage}
                    >Next</Link>
                </>
            }
        </div>
    )
}

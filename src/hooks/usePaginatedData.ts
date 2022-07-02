import { useEffect, useState } from "react";
import { useFetch } from "./useFetch";

interface IParinatedProps {
    urlData: { basePath: string, queryParams: string | null },
    itemsPerPage: number,
    state?: any
}

interface IPaginatedResponse {
    data: unknown,
    error: string | null,
    loading: boolean,
    currentPage: number,
    pagesCount: number,
    getNextPage: () => void,
    getPrevPage: () => void,
    setPage: (n: number) => void
}

type GetPaginatedData = (props: IParinatedProps) => (IPaginatedResponse);

export const usePaginatedData: GetPaginatedData = ({ urlData, itemsPerPage, state }) => {

    const [currentPage, setCurrentPage] = useState(
        () => +window.location.search?.split('=')[1] || 1);

    const query = urlData.queryParams ?
        `${urlData.basePath}&${urlData.queryParams}&_page=${currentPage}&_limit=${itemsPerPage}`
        : `${urlData.basePath}&_page=${currentPage}&_limit=${itemsPerPage}`;

    const { data, dataCount, loading, error } = useFetch({
        url: query,
        state: state,
    });
    const pagesCount = Math.ceil(+dataCount / itemsPerPage);

    //For pagination update when filter query was changed:
    useEffect(() => {
        if (pagesCount !== 0 && currentPage > pagesCount) setCurrentPage(1)
    }, [pagesCount, currentPage])

    const getNextPage = () => {
        setCurrentPage(currentPage => {
            if (currentPage >= pagesCount) {
                return currentPage;
            } else {
                return currentPage + 1;
            }
        })
    }

    const getPrevPage = () => {
        setCurrentPage(currentPage => {
            if (currentPage <= 1) {
                return currentPage;
            } else {
                return currentPage - 1;
            }
        })
    }

    const setPage = (n: number) => {
        if (n > pagesCount) {
            setCurrentPage(pagesCount);
        } else if (n < 1) {
            setCurrentPage(1);
        } else {
            setCurrentPage(n);
        }
    }

    return { data, loading, error, currentPage, pagesCount, getNextPage, getPrevPage, setPage };
}
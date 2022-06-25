import { useEffect, useState } from "react";
import { IUserInfo } from "../types/types";

export interface IRespInfo {
    data: unknown,
    error: string | null,
    loading: boolean,
}

export const useFetch = (url: string, state?: any): IRespInfo => {

    const [data, setData] = useState<unknown>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const abortController = new AbortController();
        setLoading(true);

        fetch(url, {
            method: 'GET',
            signal: abortController.signal
        })
            .then(res => {
                if (res.ok !== true) {
                    throw new Error('Could not load data from this resourse');
                } else {
                    return res.json();
                }
            })
            .then(data => {
                console.log('Data received!');

                setData(data);
                setError(null);
            })
            .catch((err: Error) => {
                setError(err.message);
            })
            .finally(() => {
                setLoading(false);
            })
        return () => abortController.abort();

    }, [url, state])

    return { data, loading, error };
}
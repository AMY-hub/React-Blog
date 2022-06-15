import { useEffect, useState } from "react";

export interface IRespInfo {
    data: unknown,
    error: string | null,
    loading: boolean,
}

export const useFetch = (url: string, state?: any): IRespInfo => {

    const [data, setData] = useState<unknown>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);


    const abortController = new AbortController();

    const getData = () => {
        fetch(url, {
            signal: abortController.signal
        })
            .then(res => {
                if (res.ok !== true) {
                    throw new Error('Could not load data from this resourse');
                } else {
                    return res.json()
                }
            })
            .then(data => {
                setData(data);
                setError(null);
                setLoading(false);
            })
            .catch((err: Error) => {
                if (err.name === 'AbortError') {
                    return () => abortController.abort();
                }
                setError(err.message);
                setLoading(false);
            })
    }

    useEffect(() => {
        getData();
    }, [state])

    return { data, loading, error };
}
import { useEffect, useState } from "react";

interface IUseFetchProps {
    url: string,
    state?: any
}

interface IUseFetchResp {
    data: any,
    dataCount: string,
    loading: boolean,
    error: string | null
}

type UseFetch = (props: IUseFetchProps) => (IUseFetchResp);

export const useFetch: UseFetch = ({ url, state }) => {

    const [data, setData] = useState<unknown>(null);
    const [dataCount, setDataCount] = useState('0');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const abortController = new AbortController();
        setLoading(true);
        let total: string | null;

        fetch(url, {
            method: 'GET',
            signal: abortController.signal
        }).then(res => {
            if (res.ok !== true) {
                throw new Error('Could not load data from this resourse');
            } else {
                total = res.headers.get('X-Total-Count');
                return res.json();
            }
        }).then(data => {
            console.log('Data received!');
            setData(data);
            if (total) {
                setDataCount(total);
            }
            setError(null);
        }).catch((err: Error) => {
            console.log(err.name);
            if (err.name !== 'AbortError') setError(err.message);
        }).finally(() => {
            setLoading(false);
        })
        return () => abortController.abort();
    }, [url, state])

    return { data, dataCount, loading, error }
}
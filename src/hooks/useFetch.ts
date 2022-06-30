import { useEffect, useState } from "react";

interface IUseFetchProps {
    url: string,
    state?: any,
    setDataCount?: (state: string) => void
}

interface IUseFetchResp {
    data: any,
    loading: boolean,
    error: string | null
}

type UseFetch = (props: IUseFetchProps) => (IUseFetchResp);

export const useFetch: UseFetch = ({ url, state, setDataCount }) => {

    const [data, setData] = useState<unknown>(null);
    const [loading, setLoading] = useState(false);
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
                    console.log(res.headers.get('X-Total-Count'));
                    if (setDataCount) {
                        const total = res.headers.get('X-Total-Count');
                        if (total) setDataCount(total);
                    }
                    return res.json();
                }
            })
            .then(data => {
                console.log('Data received!');
                setData(data);
                setError(null);
            })
            .catch((err: Error) => {
                console.log(err.name);

                if (err.name !== 'AbortError') setError(err.message);
            })
            .finally(() => {
                setLoading(false);
            })
        return () => abortController.abort();

    }, [url, state])

    return { data, loading, error }
}
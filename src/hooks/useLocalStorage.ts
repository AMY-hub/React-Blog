import { useEffect, useState } from "react";

type useLS = (key: string, initialValue: any) => [data: any, setData: React.Dispatch<any>]

export const useLocalStorage: useLS = (key, initialValue) => {
    const getValue = () => {
        const data = localStorage.getItem(key);
        if (data) {
            return JSON.parse(data);
        } else {
            return initialValue;
        }
    }

    const [data, setData] = useState(() => {
        const data = getValue();
        //just because we haven't had refresh token:
        if (data && key === 'blogUser' && 'createdAt' in data) {
            const exp = (Date.now() - data.createdAt) / 1000;
            console.log(exp);
            if (exp >= 3600) {
                localStorage.removeItem(key);
                return null;
            }
        }
        return data;
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(data));
    }, [data])

    return [data, setData];
}
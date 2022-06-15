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

    const [data, setData] = useState(getValue);

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(data));
    }, [data])

    return [data, setData];
}
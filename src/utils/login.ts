import { NavigateFunction } from "react-router-dom";
import { IUserFormData, IUserInfo } from "../types/types";

type LoginFn = (
    path: string,
    data: IUserFormData,
    setUser: React.Dispatch<React.SetStateAction<IUserInfo | null>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setError: React.Dispatch<React.SetStateAction<string | null>>,
    navigate?: NavigateFunction
) => void;

export const login: LoginFn = (path, data, setUser, setLoading, setError, navigate) => {
    setLoading(true);
    fetch(path, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then(data => {
            if (data.user && data.accessToken) {
                setUser({
                    ...data.user,
                    accessToken: data.accessToken,
                    createdAt: Date.now()
                });
                if (navigate) navigate('/');
            } else if (data === 'Cannot find user' || data === 'Incorrect password' || data === 'Email already exists') {
                throw new Error(data);
            } else {
                throw new Error('Something went wrong...');
            }
        })
        .catch((err: Error) => setError(err.message))
        .finally(() => setLoading(false));
}
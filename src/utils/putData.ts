import { mainPath } from "../consts/path";
import { IUserInfo } from "../types/types";

type PutFN = (
    id: number | string,
    data: any,
    user: IUserInfo | null,
    setPending: React.Dispatch<React.SetStateAction<boolean>>,
    setError: React.Dispatch<React.SetStateAction<string | null>>,
    setSuccess: React.Dispatch<React.SetStateAction<boolean>>,
) => void;

export const putData: PutFN = (id, data, user, setPending, setError, setSuccess) => {
    setSuccess(false);
    setPending(true);
    const path = mainPath + `/posts/` + id;
    fetch(path, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user?.accessToken}`
        },
        body: JSON.stringify(data)
    })
        .then(res => {
            if (res.ok !== true) {
                throw new Error(`Couldn't create post`);
            } else {
                setSuccess(true);
            }
        })
        .catch((err: Error) => {
            setError(err.message);
        })
        .finally(() => {
            setPending(false);
        })
}
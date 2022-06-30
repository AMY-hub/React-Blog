import { mainPath } from "../consts/path";
import { IUserInfo } from "../types/types";

type postFN = (
    data: any,
    user: IUserInfo | null,
    setPending: React.Dispatch<React.SetStateAction<boolean>>,
    setError: React.Dispatch<React.SetStateAction<string | null>>,
    setSuccess: React.Dispatch<React.SetStateAction<boolean>>,
) => void;

export const postData: postFN = (data, user, setPending, setError, setSuccess) => {
    setSuccess(false);
    setPending(true);
    const path = mainPath + `/posts/`;
    fetch(path, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user?.accessToken}`
        },
        body: JSON.stringify(data)
    })
        .then(res => {
            console.log(res);

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

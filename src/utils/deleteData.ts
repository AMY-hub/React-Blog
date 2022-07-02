import { mainPath } from "../consts/path";
import { IUserInfo } from "../types/types";

type DeleteFN = (
    id: number | string,
    user: IUserInfo | null,
    setError: React.Dispatch<React.SetStateAction<string | null>>,
    callback?: () => void) => void;

export const deleteData: DeleteFN = (id, user, setError, callback?: () => void) => {
    fetch(mainPath + '/posts/' + id, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${user?.accessToken}`
        }
    }).then(() => {
        if (typeof callback === 'function') callback();
    }).catch((err: Error) => {
        setError(err.message);
    })
}
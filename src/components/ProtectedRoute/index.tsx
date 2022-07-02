import { Navigate } from "react-router-dom";

import { IUserInfo } from "../../types/types";

interface IPRouteProps {
    user: IUserInfo | null,
    children: JSX.Element
}

export const ProtectedRoute: React.FC<IPRouteProps> = ({ user, children }) => {
    if (!user) {
        return (<Navigate to='/login' />)
    }
    return children;
}
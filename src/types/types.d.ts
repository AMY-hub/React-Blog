export type Theme = 'light' | 'dark';

export interface IAppContext {
    posts: IPost[],
    theme: string,
    setTheme: React.Dispatch<React.SetStateAction<string>>,
    filter: string,
    setFilter: React.Dispatch<React.SetStateAction<string>>,
    sidebarOpen: boolean,
    setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>,
    user: IUserInfo | null,
    setUser: React.Dispatch<React.SetStateAction<IUserInfo | null>>,
    updatePostsList: boolean,
    setUpdatePostsList: React.Dispatch<React.SetStateAction<boolean>>
}

export interface IPostFormData {
    title: string,
    preview: string,
    body: string,
    author: string,
    topic: string,
    authorId: string
}

export interface IPost extends IPostFormData {
    createdAt: number,
    id: number,
}

export interface IUserInfo {
    email: string,
    name: string,
    id: number,
    accessToken: string
}

export interface IUserFormData {
    email: string,
    password: string,
    name?: string
}

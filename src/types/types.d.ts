
export type Theme = 'light' | 'dark';

export interface IAppContext {
    allPosts: IPost[],
    selectedPosts: IPost[],
    setSelectedPosts: React.Dispatch<React.SetStateAction<IPost[]>>,
    theme: string,
    setTheme: React.Dispatch<any>,
    filter: string,
    setFilter: React.Dispatch<React.SetStateAction<string>>,
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
    topics: string[],
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

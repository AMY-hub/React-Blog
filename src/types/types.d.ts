
export type Theme = 'light' | 'dark';

export interface IAppContext {
    posts: IPost[] | null,
    theme: string,
    setTheme: (theme: Theme) => void;
}

export interface IPost {
    title: string,
    body: string,
    author: string,
    topics: string[],
    createdAt: number,
    id: number
}


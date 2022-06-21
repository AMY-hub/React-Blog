
export type Theme = 'light' | 'dark';

export interface IAppContext {
    allPosts: IPost[],
    selectedPosts: IPost[],
    setSelectedPosts: React.Dispatch<React.SetStateAction<IPost[]>>,
    theme: string,
    setTheme: React.Dispatch<any>,
    filter: string,
    setFilter: React.Dispatch<React.SetStateAction<string>>
}

export interface IPost {
    title: string,
    body: string,
    author: string,
    topics: string[],
    createdAt: number,
    id: number
}

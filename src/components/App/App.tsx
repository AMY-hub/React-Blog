import { createContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';

import { mainPath } from '../../consts/path';
import { IAppContext, IPost } from '../../types/types';

import '../../styles/vars.scss';
import './App.scss';

import { Header } from '../Header';
import { MainPage } from '../../pages/MainPage';
import { AddPostPage } from '../../pages/AddPostPage';
import { PostDetailsPage } from '../../pages/PostDetailsPage';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { NotFound } from '../../pages/NotFound';
import { ErrorMessage } from '../ErrorMessage';
import { LoginPage } from '../../pages/LoginPage';

export const AppContext = createContext<IAppContext | null>(null);

export function App() {

  const [theme, setTheme] = useLocalStorage('blogTheme', 'dark');
  // const [posts, setPosts] = useState<IPost[] | null>(null);

  const { data, error } = useFetch(mainPath + '/posts');
  const posts = data as IPost[];

  return (
    <BrowserRouter>
      <AppContext.Provider value={{
        posts: posts,
        theme: theme,
        setTheme: setTheme
      }}>
        <div className={`App theme-${theme === 'dark' ? 'dark' : 'light'}`}>
          <div className='wrapper'>
            <Header />
            {error ?
              <ErrorMessage text={error} />
              :
              <Routes>
                <Route path='/' element={<MainPage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/newpost' element={<AddPostPage />} />
                <Route path='/posts/:id' element={<PostDetailsPage />} />
                <Route path='*' element={<NotFound />} />
              </Routes>
            }
          </div>
        </div>
      </AppContext.Provider>

    </BrowserRouter >

  );
}


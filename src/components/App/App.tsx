import { useState, createContext, useEffect, useLayoutEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';

import { mainPath } from '../../consts/path';
import { IAppContext, IPost, IUserInfo } from '../../types/types';

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
import { ProtectedRoute } from '../ProtectedRoute';
import { SuccessPage } from '../../pages/SuccessPage';
import { EditPostPage } from '../../pages/EditPostPage';

export const AppContext = createContext<IAppContext | null>(null);

export function App() {

  const [theme, setTheme] = useLocalStorage('blogTheme', 'dark');
  const [selectedPosts, setSelectedPosts] = useState<Array<IPost>>([]);
  const [filter, setFilter] = useState<string>('all');
  const [updatePostsList, setUpdatePostsList] = useState<boolean>(false);
  const [user, setUser] = useLocalStorage('blogUser', null);

  const { data, error } = useFetch(mainPath + '/posts', updatePostsList);
  const allPosts = data as IPost[];

  useLayoutEffect(() => {
    if (filter !== 'all') {
      const filtered = allPosts.filter(post => post.topics.includes(filter));
      setSelectedPosts(filtered);
    } else {
      setSelectedPosts(allPosts);
    }
  }, [filter, data]);



  return (
    <BrowserRouter>
      <AppContext.Provider value={{
        allPosts,
        selectedPosts,
        setSelectedPosts,
        theme,
        setTheme,
        filter,
        setFilter,
        user,
        setUser,
        updatePostsList,
        setUpdatePostsList
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
                <Route path='/newpost' element={
                  <ProtectedRoute user={user}>
                    <AddPostPage />
                  </ProtectedRoute>
                } />
                <Route path='/editpost/:id' element={
                  <ProtectedRoute user={user}>
                    <EditPostPage />
                  </ProtectedRoute>
                } />
                <Route path='/successfully' element={<SuccessPage />} />
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


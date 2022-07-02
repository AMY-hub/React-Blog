import { useState, createContext } from 'react';
import { BrowserRouter, HashRouter, Routes, Route } from 'react-router-dom';
import { usePaginatedData } from '../../hooks/usePaginatedData';
import { useLocalStorage } from '../../hooks/useLocalStorage';

import { mainPath } from '../../consts/path';
import { IAppContext, IPost } from '../../types/types';

import { Header } from '../Header';
import { MainPage } from '../../pages/MainPage';
import { AddPostPage } from '../../pages/AddPostPage';
import { PostDetailsPage } from '../../pages/PostDetailsPage';
import { NotFound } from '../../pages/NotFound';
import { ErrorMessage } from '../ErrorMessage';
import { LoginPage } from '../../pages/LoginPage';
import { ProtectedRoute } from '../ProtectedRoute';
import { SuccessPage } from '../../pages/SuccessPage';
import { EditPostPage } from '../../pages/EditPostPage';
import { Pagination } from '../Pagination';

import '../../styles/vars.scss';
import './App.scss';

const path = process.env.REACT_APP_FOR_PATH;

export const AppContext = createContext<IAppContext | null>(null);

export function App() {

  const [theme, setTheme] = useLocalStorage('blogTheme', 'dark');
  const [filter, setFilter] = useState('all');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [updatePostsList, setUpdatePostsList] = useState<boolean>(false);
  const [user, setUser] = useLocalStorage('blogUser', null);

  const { data, error, currentPage, pagesCount, getNextPage, getPrevPage, setPage } = usePaginatedData({
    urlData: {
      basePath: mainPath + '/posts?_sort=createdAt&_order=desc',
      queryParams: filter === 'all' ? null : `topic=${filter}`
    },
    state: updatePostsList,
    itemsPerPage: 3
  });
  const posts = data as IPost[];

  const pagination = <Pagination
    currentPage={currentPage}
    pagesCount={pagesCount}
    setPage={setPage}
    getNextPage={getNextPage}
    getPrevPage={getPrevPage}
  />

  return (
    <HashRouter>
      <AppContext.Provider value={{
        posts,
        theme,
        setTheme,
        filter,
        setFilter,
        sidebarOpen,
        setSidebarOpen,
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
                <Route path={path} element={<MainPage pagination={pagination} />} />
                <Route path={path + 'login'} element={<LoginPage />} />
                <Route path={path + 'newpost'} element={
                  <ProtectedRoute user={user}>
                    <AddPostPage />
                  </ProtectedRoute>
                } />
                <Route path={path + 'editpost/:id'} element={
                  <ProtectedRoute user={user}>
                    <EditPostPage />
                  </ProtectedRoute>
                } />
                <Route path={path + 'successfully'} element={<SuccessPage />} />
                <Route path={path + 'posts/:id'} element={<PostDetailsPage />} />
                <Route path='*' element={<NotFound />} />
              </Routes>
            }
          </div>
        </div>
      </AppContext.Provider>
    </HashRouter >
  );
}


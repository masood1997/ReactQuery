import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Layout from './Layout';
import Home from './components/Home/Home.jsx';
import Error from './components/Error/Error.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Login from './components/Login/Login.jsx';
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes.jsx';
import PostPage from './components/PostPage/PostPage.jsx';
import EditPost from './components/EditPost/EditPost.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<Error />}>
      <Route path="login" element={<Login />} />
      //Protected Routes
      <Route element={<ProtectedRoutes />}>
        <Route path="" element={<Home />} />
        <Route path="/post/:id" element = {<PostPage/>}/>
        <Route path ='/edit/:id' element={<EditPost/>}/>
      </Route>
    </Route>
  )
);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);

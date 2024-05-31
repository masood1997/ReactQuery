import { Outlet } from 'react-router-dom';
import BlogContextProvider from './context/BlogContextProvider';

const Layout = () => {
  return (
    <main>
      <BlogContextProvider>
        <Outlet />
      </BlogContextProvider>
    </main>
  );
};

export default Layout;

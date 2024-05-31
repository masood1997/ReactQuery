import { useBlog } from '../../context/BlogContext';
import { Outlet } from 'react-router-dom';
import Login from '../Login/Login';

const ProtectedRoutes = () => {
  const { isAuthenticated } = useBlog();
  return isAuthenticated?.accessToken ? <Outlet /> : <Login/>;
};

export default ProtectedRoutes;

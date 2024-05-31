import { useEffect } from 'react';
import apiPrivateInstance from '../api/todoPrivateApi';
import { useBlog } from '../context/BlogContext';

const useAxiosPrivate = () => {
  const { isAuthenticated } = useBlog();

  useEffect(() => {
    const requestInterceptor = apiPrivateInstance.interceptors.request.use(
      (config) => {
        if (!config.headers['authorization']) {
          config.headers['authorization'] = `Bearer ${isAuthenticated.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => {
      apiPrivateInstance.interceptors.request.eject(requestInterceptor);
    };
  }, [isAuthenticated.accessToken]);

  return apiPrivateInstance;
};

export default useAxiosPrivate;

import { useState } from 'react';
import BlogContext from './BlogContext';

const BlogContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState({});
  return <BlogContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>{children}</BlogContext.Provider>;
};

export default BlogContextProvider;

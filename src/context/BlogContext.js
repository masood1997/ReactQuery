import { createContext, useContext } from "react";

const BlogContext = createContext({})

export const useBlog = ()=>{
    return useContext(BlogContext)
}

export default BlogContext
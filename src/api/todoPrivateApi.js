import axios from "axios";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const apiPrivateInstance = axios.create({
    baseURL:'http://localhost:2000/api/v1',
    headers:{
        'Content-type' : "application/json"
    },
    withCredentials:true
});

export const allPosts = async ()=>{
    const apiPrivateInstance = useAxiosPrivate();
    const response = await apiPrivateInstance.get('/task/myTasks');
    return response?.data
};

export default apiPrivateInstance;
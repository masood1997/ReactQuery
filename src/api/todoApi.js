import axios from "axios";

const apiInstance = axios.create({
    baseURL:'http://localhost:2000/api/v1',
    headers:{
        'Content-type' : "application/json"
    },
    withCredentials:true
})

export const info = async ()=>{
    const response = await apiInstance.get('/info');
    return response?.data
}

export const login = async (userDetail)=>{
    const response = await apiInstance.post('/user/login',{...userDetail});
    return response
}

export default apiInstance ; 
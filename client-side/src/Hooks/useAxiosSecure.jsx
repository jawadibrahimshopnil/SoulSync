import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const axiosSecure = axios.create({
    baseURL: "https://soulsync-eta.vercel.app",
    withCredentials: true,
})

const useAxiosSecure = () => {
    const {logOutUser} = useAuth();
    const navigate = useNavigate();

    useEffect(()=>{
        axiosSecure.interceptors.response.use(res => {
            return res;
        }, err=>{
            if(err.response.status === 401 || err.response.status === 403) {
                logOutUser()
                    .then(()=>{navigate('/login')})
                    .catch(err => console.log(err))
            }
        })
    })
    return axiosSecure;
};

export default useAxiosSecure;
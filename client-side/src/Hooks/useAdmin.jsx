import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useAdmin = () => {
    const {user, loading} = useAuth();
    const axiosSecure = useAxiosSecure();
    const {data:isAdmin, isPending:adminLoading} = useQuery({
        enabled: !loading,
        queryKey: ["isAdmin"],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/isadmin/${user.email}`);
            return res.data.isAdmin;
        }
    })
    return [isAdmin, adminLoading];
};

export default useAdmin;
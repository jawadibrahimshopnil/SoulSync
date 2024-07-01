import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const usePremium = () => {
    const {user} = useAuth()
    const axiosSecure = useAxiosSecure();
    const {data:isPremium, isPending:premiumLoading} = useQuery({
        queryKey: ["ispremium"],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/ispremium/${user.email}`);
            return res.data.isPremium;
        }
    })
    return [isPremium, premiumLoading];
};

export default usePremium;
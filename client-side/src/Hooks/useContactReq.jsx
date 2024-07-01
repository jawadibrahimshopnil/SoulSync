import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useContactReq = () => {
    const axiosSecure = useAxiosSecure();
    const {data:contactReq, isPending:contactLoading, refetch} = useQuery({
        queryKey: ['contacts'],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/requested-contact`);
            return res.data;
        }
    })
    return [contactReq, contactLoading, refetch];
};

export default useContactReq;
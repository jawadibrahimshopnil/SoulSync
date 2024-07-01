import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from './useAxiosPublic';

const useBiodatas = (page) => {
    const axiosPublic = useAxiosPublic()
    const {data:biodatas =[], isPending: loading, refetch} = useQuery({
        queryKey: ["biodatas", page],
        queryFn: async()=>{
            const res = await axiosPublic.get(`/biodatas/card?page=${page}`);
            return res.data;
        }
    })
    return [biodatas, loading, refetch];
};

export default useBiodatas;
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const useStats = () => {
    const axiosPublic = useAxiosPublic();
    const {data:stats, isPending:statsLoading} = useQuery({
        queryKey: ["stats"],
        queryFn: async()=>{
            const res = await axiosPublic.get('/stats');
            return res.data;
        }
    })
    return [stats, statsLoading];
};

export default useStats;
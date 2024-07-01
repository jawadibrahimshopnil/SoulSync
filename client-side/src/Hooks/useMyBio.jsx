
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useMyBio = () => {
    const axiosSecure = useAxiosSecure();
    const {data:biodata, isPending:loading} = useQuery({
        queryKey: ['biodata', "mybio"],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/mybiodata`);
            return res.data;
        }
    })
    return [biodata, loading];
};

export default useMyBio;
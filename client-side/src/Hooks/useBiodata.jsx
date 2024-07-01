
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useBiodata = (id) => {
    const axiosSecure = useAxiosSecure();
    const {data:biodata={}, isPending:bioLoading} = useQuery({
        queryKey: ['biodata', id],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/biodata/${id}`);
            return res.data;
        }
    })
    return [biodata, bioLoading];
};

export default useBiodata;
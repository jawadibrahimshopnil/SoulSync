import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from './useAxiosPublic';

const useSuccStory = () => {
    const axiosPublic = useAxiosPublic()
    const {data:stories =[], isPending: storyLoading} = useQuery({
        queryKey: ["successStories"],
        queryFn: async()=>{
            const res = await axiosPublic.get(`/success-stories`);
            return res.data;
        }
    })
    return [stories, storyLoading];
};

export default useSuccStory;
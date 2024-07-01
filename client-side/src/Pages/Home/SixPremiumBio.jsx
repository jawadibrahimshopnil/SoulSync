import { useQuery } from "@tanstack/react-query";
import BioCard from "../../Compnents/BioCard";
import useAxiosPublic from './../../Hooks/useAxiosPublic';
import { useEffect, useState } from "react";
import Loading from "../../Compnents/Loading";

const SixPremiumBio = () => {
    const axiosPublic = useAxiosPublic();
    const { data: premiumBio = [], isPending: premiumBioLoading } = useQuery({
        queryKey: ['premiumbios'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/six-premium`);
            return res.data;
        }
    })

    const [sortedPremBios, setSortedPremBio] = useState(premiumBio);
    useEffect(() => setSortedPremBio(premiumBio), [premiumBio]);

    const handlePremiumSort = (e) => {
        const sortType = e.target.value;
        if(sortType === "asc"){
            setSortedPremBio([...premiumBio])
        }else{
            const sortedBios = [...premiumBio].sort((prev, next)=> next.age - prev.age)
            setSortedPremBio(sortedBios);
        }
    }


    if (premiumBioLoading) {
        return <Loading />
    }
    return (
        <div className="py-12" id="premiumbios">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mx-auto text-center">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">Discover <span className="text-rose-600"> Premium</span> Matches</h2>
                    <p className="text-base md:text-lg lg:text-xl mb-6 max-w-2xl mx-auto">
                        Handpicked Premium Members Ready to Connect
                    </p>
                </div>
                <div className="text-center mb-4">
                    <select
                        defaultValue={"asc"}
                        onChange={handlePremiumSort}
                        className="border border-rose-400 bg-gray-200 rounded-lg px-3 py-2">
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {sortedPremBios.map((bio, idx) => (
                        <BioCard key={idx} card={bio} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SixPremiumBio;
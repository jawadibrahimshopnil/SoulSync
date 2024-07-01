import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";
import Loading from "../../../Compnents/Loading";

const ApprovedPremium = () => {
    const axiosSecure = useAxiosSecure();
    const { data: reqPremiums, isPending: premiumloading, refetch } = useQuery({
        queryKey: ['premiums'],
        queryFn: async () => {
            const res = await axiosSecure.get("/requested-premium");
            return res.data;
        }
    })
    if (premiumloading) {
        return <Loading />
    }

    const handlePremium = (email) => {
        axiosSecure.patch(`/make-premium/${email}`)
        .then(({data})=>{
            if(data.modifiedCount){
                toast.success("Approved Premium");
                refetch();
            }
        })
    }

    return (
        <div className="container mx-auto p-4">
            <div className="overflow-x-auto">
                <h1 className="text-center text-3xl font-semibold mb-4">Approved Premium</h1>
                <table className="min-w-full bg-white border border-gray-200">
                    <thead className="bg-rose-600 text-white">
                        <tr>
                            <th className="py-3 px-4 text-left">Name</th>
                            <th className="py-3 px-4 text-left">Email</th>
                            <th className="py-3 px-4 text-left">Biodata ID</th>
                            <th className="py-3 px-4 text-left">Make Premium</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            reqPremiums.map((premium, idx) => <tr key={idx} className="border-b hover:bg-rose-100">
                                <td className="py-3 px-4">{premium.name}</td>
                                <td className="py-3 px-4">{premium.email}</td>
                                <td className="py-3 px-4">{premium.biodataId}</td>
                                <td className="py-3 px-4 text-center">
                                    {
                                        premium.status !== "approved" ?
                                            <button onClick={()=>handlePremium(premium.email)} className="bg-rose-600 text-white px-3 py-1 rounded">Premium</button>
                                            :
                                            "Premiumed"
                                    }

                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ApprovedPremium;
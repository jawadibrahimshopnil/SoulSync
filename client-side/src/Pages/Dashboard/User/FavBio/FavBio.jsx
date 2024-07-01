import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from './../../../../Hooks/useAxiosSecure';
import { toast } from "react-toastify";
import Loading from "../../../../Compnents/Loading";

const FavBio = () => {
    const axiosSecure = useAxiosSecure();
    const { data: favBios, isPending: loading, refetch } = useQuery({
        queryKey: ["favbios"],
        queryFn: async () => {
            const res = axiosSecure.get("/myfavbio");
            return (await res).data;
        }
    })
    if (loading) {
        return <Loading />
    }

    const handleDelete = (id)=>{
        axiosSecure.patch(`/favorite/delete/${id}`)
        .then(({data})=>{
            if(data.modifiedCount > 0){
                toast.success("Removed From Favorite");
                refetch();
            }
        })
        
    }
    if(!favBios.length){
        return <h1 className="text-center text-2xl">There is no favorite biodata</h1>
    }

    return (
        <div className="container mx-auto p-4">
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead className="bg-rose-600 text-white">
                        <tr>
                            <th className="py-3 px-4 text-left">Biodata ID</th>
                            <th className="py-3 px-4 text-left">Name</th>
                            <th className="py-3 px-4 text-left">Permanent Address</th>
                            <th className="py-3 px-4 text-left">Occupation</th>
                            <th className="py-3 px-4 text-center">Delete Button</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            favBios.map((favBio, idx) => (
                                <tr key={idx} className="border-b hover:bg-rose-100">
                                    <td className="py-3 px-4">{favBio.biodataId}</td>
                                    <td className="py-3 px-4">{favBio.name}</td>
                                    <td className="py-3 px-4">{favBio.permanentDivision}</td>
                                    <td className="py-3 px-4">{favBio.occupation}</td>
                                    <td className="py-3 px-4 text-center">
                                        <button onClick={()=>handleDelete(favBio.biodataId)} className="bg-rose-600 text-white px-3 py-1 rounded">Delete</button>
                                    </td>
                                </tr>
                            ))
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FavBio;
import { toast } from "react-toastify";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../../Compnents/Loading";

const ContactReq = () => {
    const axiosSecure = useAxiosSecure()

    const {data:myContactReq, isPending:contactLoading, refetch} = useQuery({
        queryKey: ['mycontacts'],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/mycontacts`);
            return res.data;
        }
    })
    const handleDelete = (id)=>{
        axiosSecure.delete(`/request-contact/${id}`)
        .then(({data})=>{
            if(data.deletedCount){
                toast.success("Request Deleted")
                refetch()
            }
        })
    }

    if (contactLoading) {
        return <Loading />
    }
    if(!myContactReq.length){
        return <h1 className="text-center text-2xl">There is no contact request</h1>
    }
    return (
        <div className="container mx-auto p-4">
            <div className="overflow-x-auto">
                <h1 className="text-center text-3xl font-semibold mb-4">Contact Request</h1>
                <table className="min-w-full bg-white border border-gray-200">
                    <thead className="bg-rose-600 text-white">
                        <tr>
                            <th className="py-3 px-4">Name</th>
                            <th className="py-3 px-4">Biodata ID</th>
                            <th className="py-3 px-4">Status</th>
                            <th className="py-3 px-4">Mobile No.</th>
                            <th className="py-3 px-4">Email</th>
                            <th className="py-3 px-4">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            myContactReq.map((contact, idx) => <tr key={idx} className="border-b hover:bg-rose-100 text-center">
                                <td className="py-3 px-4">{contact.reqForName}</td>
                                <td className="py-3 px-4">{contact.reqForBioId}</td>
                                <td className="py-3 px-4">{contact.status}</td>
                                <td className="py-3 px-4">{contact.reqMobileNum ? contact.reqMobileNum : "*****"}</td>
                                <td className="py-3 px-4">{contact.reqEmail ? contact.reqEmail : "*****"}</td>
                                <td className="py-3 px-4">
                                    <button onClick={()=>handleDelete(contact._id)} className="bg-rose-600 text-white px-3 py-1 rounded">Delete</button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ContactReq;
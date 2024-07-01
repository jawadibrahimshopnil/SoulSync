import { toast } from "react-toastify";
import useContactReq from "../../../Hooks/useContactReq";
import useAxiosSecure from './../../../Hooks/useAxiosSecure';
import Loading from "../../../Compnents/Loading";

const RequestedContact = () => {
    const [contactReq, contactLoading, refetch] = useContactReq();
    const axiosSecure = useAxiosSecure();

    if(contactLoading){
        return <Loading />
    }

    const handleApprove = (biodataId)=>{
        axiosSecure.patch(`/approve/${biodataId}`)
        .then(({data})=>{
            if(data.modifiedCount){
                toast.success("Request Approved");
                refetch();
            }
        })
    }

    return (
        <div className="container mx-auto p-4">
            <div className="overflow-x-auto">
            <h1 className="text-center text-3xl font-semibold mb-4">Approve Contact Request</h1>
                <table className="min-w-full bg-white border border-gray-200">
                    <thead className="bg-rose-600 text-white">
                        <tr className="text-center">
                            <th className="py-3 px-4">Name</th>
                            <th className="py-3 px-4">Email</th>
                            <th className="py-3 px-4">Biodata ID</th>
                            <th className="py-3 px-4">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            contactReq.map((contact, idx)=> <tr key={idx} className="border-b hover:bg-rose-100 text-center">
                            <td className="py-3 px-4">{contact.reqByName}</td>
                            <td className="py-3 px-4">{contact.reqByEmail}</td>
                            <td className="py-3 px-4">{contact.reqForBioId}</td>
                            <td className="py-3 px-4 text-center">
                                {
                                    contact.status === "pending" ?
                                    <button onClick={()=>handleApprove(contact.reqForBioId)} className="bg-rose-600 text-white px-3 py-1 rounded">Approve</button>
                                    : 
                                    "approved"
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

export default RequestedContact;
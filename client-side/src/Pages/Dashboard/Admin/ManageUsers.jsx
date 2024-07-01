import { FaMagnifyingGlass } from "react-icons/fa6";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Loading from "../../../Compnents/Loading";

const ManageUsers = () => {

    const axiosSecure = useAxiosSecure();
    const [search, setSearch] = useState('')

    const { data: users, isPending: usersLoading, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?search=${search}`);
            return res.data;
        }
    })

    useEffect(() => {
        refetch();
    }, [search, refetch])


    const handlePremium = (email) => {
        axiosSecure.patch(`/make-premium/${email}`)
            .then(({ data }) => {
                if (data.modifiedCount) {
                    toast.success("Approved Premium");
                    refetch();
                }
            })
    }
    const handleAdmin = (email) => {
        axiosSecure.patch(`/make-admin/${email}`)
            .then(({ data }) => {
                if (data.modifiedCount) {
                    toast.success("Approved Admin");
                    refetch();
                }
            })
    }
    const handleSearch = (e)=>{
        const searchTxt = e.target.value;
        setSearch(searchTxt);
    }

    if (usersLoading) {
        return <Loading />
    }

    return (
        <div className="container mx-auto p-4">
            <div className="overflow-x-auto">
                <h1 className="text-center text-3xl font-semibold mb-4">Manage User</h1>
                <div className="mb-2">
                    <div className="relative">
                        <input
                            onChange={handleSearch}
                            type="text"
                            placeholder="Search by username..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
                        />
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <FaMagnifyingGlass className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </div>
                    </div>
                </div>

                <table className="min-w-full bg-white border border-gray-200">
                    <thead className="bg-rose-600 text-white">
                        <tr>
                            <th className="py-3 px-4 text-left">Name</th>
                            <th className="py-3 px-4 text-left">Email</th>
                            <th className="py-3 px-4 text-left">Make Admin</th>
                            <th className="py-3 px-4 text-left">Make Premium</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, idx)=><tr key={idx} className="border-b hover:bg-rose-100">
                            <td className="py-3 px-4">{user.name}</td>
                            <td className="py-3 px-4">{user.email}</td>
                            <td className="py-3 px-4 text-center">
                                {
                                    user.isAdmin !== "admin" ?
                                    <button onClick={() => handleAdmin(user.email)} className="bg-rose-600 text-white px-3 py-1 rounded">Make Admin</button>
                                    : "Admin"
                                }
                                
                            </td>
                            <td className="py-3 px-4 text-center">
                                {
                                    user.isPremium !== "premium" ?
                                    <button onClick={() => handlePremium(user.email)} className="bg-rose-600 text-white px-3 py-1 rounded">Make Premium</button>
                                    : "Premium"
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

export default ManageUsers;
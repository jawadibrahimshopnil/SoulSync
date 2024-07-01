
import { Divider } from '@mui/joy';
import { FaCrown } from "react-icons/fa6";
import useMyBio from '../../../../Hooks/useMyBio';
import useAxiosSecure from './../../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import Loading from '../../../../Compnents/Loading';

const ViewBio = () => {

    const [biodata, loading] = useMyBio();
    const asxiosSecure = useAxiosSecure();

    if (loading) {
        return <Loading />
    }
    if (!loading && !biodata) {
        return <p className='text-3xl text-center'>You have not created Biodata</p>
    }

    const handleApprove = () => {
        Swal.fire({
            title: "Are you sure to make your biodata premium",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, make Premium"
        }).then((result) => {
            if (result.isConfirmed) {
                const reqData = {
                    name: biodata.name,
                    email: biodata.email,
                    biodataId: biodata.biodataId,
                    status: "pending"
                }
                asxiosSecure.post("/request-premium", reqData)
                    .then(({ data }) => {
                        if (data.upsertedCount) {
                            Swal.fire({
                                title: "Requested!",
                                text: "Please wait for admin approval.",
                                icon: "success"
                            });
                        }else{
                            Swal.fire({
                                title: "Error!",
                                text: "Already Requested or other error",
                                icon: "error"
                            })
                        }
                    })
            }
        });



    }


    return (
        <div className="container mx-auto p-6">
            <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
                <h1 className="text-3xl font-semibold mb-6 text-center">Biodata Details</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex justify-center">
                        <img src={biodata.profileIMG} alt="Profile Picture" className="object-contain" />
                    </div>
                    <div className="flex flex-col">
                        <div className="grow my-4">
                            <Divider className="text-xl mb-2 col-span-full md:text-nowrap text-wrap">
                                Candidate Info
                            </Divider>
                            <h2 className="text-2xl font-semibold mb-2">{biodata.name}</h2>
                            <p className="mb-1"><strong>Type:</strong> {biodata.type}</p>
                            <p className="mb-1"><strong>Age:</strong> {biodata.age}</p>
                            <p className="mb-1"><strong>Occupation:</strong> {biodata.occupation}</p>
                            <p className="mb-1"><strong>Race:</strong> {biodata.race}</p>
                            <p className="mb-1"><strong>Height:</strong> {biodata.height} cm</p>
                            <p className="mb-1"><strong>Weight:</strong> {biodata.weight} kg</p>
                            <Divider className="text-xl mt-4 mb-2 col-span-full md:text-nowrap text-wrap">
                                Address & Parent Info
                            </Divider>
                            <p className="mb-1"><strong>Father:</strong> {biodata.fatherName}</p>
                            <p className="mb-1"><strong>Mother:</strong> {biodata.motherName}</p>
                            <p className="mb-1"><strong>Present Addr:</strong> {biodata.presentDivision}</p>
                            <p className="mb-1"><strong>Permanent Addr:</strong> {biodata.permanentDivision}</p>
                            <Divider className="text-xl mt-4 mb-2 col-span-full md:text-nowrap text-wrap">
                                Expected Partner
                            </Divider>
                            <p className="mb-1"><strong>Age:</strong> {biodata.partnerAge} years</p>
                            <p className="mb-1"><strong>Height:</strong> {biodata.partnerHeight} cm</p>
                            <p className="mb-1"><strong>Weight:</strong> {biodata.partnerWeight} kg</p>
                            <Divider className="text-xl mt-4 mb-2 col-span-full md:text-nowrap text-wrap">
                                Contact Info
                            </Divider>
                            <p className="mb-1"><strong>Mobile:</strong> {biodata.mobileNum}</p>
                            <p className="mb-1"><strong>Email:</strong> {biodata.email}</p>

                        </div>
                        <div className="md:flex gap-4">
                            <button onClick={handleApprove} className="SSBtn flex items-center gap-2 w-full">
                                <FaCrown className="SSIcon" /> Make Premium
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewBio;
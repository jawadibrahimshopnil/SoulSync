import { Divider } from "@mui/joy";
import { FaEnvelope, FaHeart } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import useAxiosSecure from './../../Hooks/useAxiosSecure';
import { toast } from "react-toastify";
import useBiodata from "../../Hooks/useBiodata";
import usePremium from "../../Hooks/usePremium";
import { useQuery } from "@tanstack/react-query";
import BioCard from "../../Compnents/BioCard";
import Loading from "../../Compnents/Loading";

const BiodataDetails = () => {
    const {id} = useParams();
    const axiosSecure = useAxiosSecure();
    const [isPremium, premiumLoading] = usePremium();
    const [biodata, bioLoading] = useBiodata(id);
    
    const {data:similarBio, isPending:similarBioLoading} = useQuery({
        queryKey: ["similarbios", biodata?.type],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/similarbio/${biodata?.type}`);
            return res.data;
        },
        enabled: !!biodata
    })

    const handleFav = () =>{
        axiosSecure.post(`/favorite/add/${biodata.biodataId}`)
        .then(({data})=>{
            if(data.modifiedCount > 0){
                toast.success("Added to Favorite")
            }else{
                toast.error("Not Added")
            }
        })
    }

    
    if(bioLoading || premiumLoading || similarBioLoading){
        return <Loading />
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
                            <p className="mb-1"><strong>Mobile:</strong> {
                                isPremium ? biodata.mobileNum
                                : "Request for Contact"
                            }
                            </p>
                            <p className="mb-1"><strong>Email:</strong> {
                                isPremium ? biodata.email
                                : "Request for Contact"
                            }
                            </p>

                        </div>
                        <div className="md:flex gap-4">
                            <button onClick={handleFav} className="SSBtn flex items-center gap-2 mb-2 md:m-0 w-1/2">
                                <FaHeart className="SSIcon" /> Add to Favourites
                            </button>
                            {
                                !isPremium && <Link to={`/contactpay/${biodata.biodataId}`} className="SSBtn flex items-center gap-2 w-full">
                                <FaEnvelope className="SSIcon" /> Request Contact 
                            </Link>
                            }
                            
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white shadow-lg rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4 text-center">Similar Profiles</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {
                        similarBio.map((bio, idx)=><BioCard card={bio} key={idx}></BioCard>)
                    }
                </div>
            </div>
        </div>
    );
};

export default BiodataDetails;
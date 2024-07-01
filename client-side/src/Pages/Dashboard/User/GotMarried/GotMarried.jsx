import { Rating } from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css'
import { useState } from "react";
import useMyBio from "../../../../Hooks/useMyBio";
import useAxiosSecure from './../../../../Hooks/useAxiosSecure';
import { toast } from "react-toastify";
import Loading from "../../../../Compnents/Loading";

const GotMarried = () => {
    const [rating, setRating] = useState(0);
    const axiosSecure = useAxiosSecure();
    const [biodata, loading] = useMyBio();
    if(loading){
        return <Loading />
    }

    const handleSubmit = (e)=>{
        e.preventDefault();

        const form = e.target;
        let maleBio = null;
        let femaleBio = null;
        if(biodata.type === "Male"){
            maleBio = form.selfBio.value;
            femaleBio = form.partnerBio.value;
        }else{
            maleBio = form.partnerBio.value;
            femaleBio = form.selfBio.value;
        }
        const coupleIMG = form.coupleIMG.value;
        const story = form.story.value;
        const marriageDate = form.marriageDate.value;

        const data = {
            maleBio,
            femaleBio,
            coupleIMG,
            rating,
            story,
            marriageDate
        }

        axiosSecure.post('success-story', data)
        .then(({data})=>{
            if(data.insertedId){
                toast.success("Added to Database")
            }
        })
    }

    return (
        <div className="min-h-screen flex items-center justify-center  p-4">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-2xl">
                <h2 className="text-2xl font-semibold text-center text-rose-600 mb-6">Share Your Success Story</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Your Biodata ID</label>
                        <input
                            required
                            type="number"
                            defaultValue={biodata.biodataId || ''}
                            name="selfBio"
                            readOnly
                            className="w-full px-4 py-2 border rounded-md border-gray-400"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Partner Biodata ID</label>
                        <input
                            required
                            type="number"
                            name="partnerBio"
                            className="w-full px-4 py-2 border rounded-md border-gray-400"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Marriage Date</label>
                        <input
                            required
                            type="date"
                            name="marriageDate"
                            className="w-full px-4 py-2 border rounded-md border-gray-400"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Couple Image Link</label>
                        <input
                            required
                            type="url"
                            name="coupleIMG"
                            className="w-full px-4 py-2 border rounded-md border-gray-400"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Rating:</label>
                        <Rating
                            style={{ maxWidth: 180 }}
                            value={rating}
                            onChange={setRating}
                            isRequired
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Success Story Review</label>
                        <textarea
                            required
                            name="story"
                            className="w-full px-4 py-2 border rounded-md border-gray-400"
                            rows="4"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-rose-600 text-white rounded-md hover:bg-rose-700"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default GotMarried;
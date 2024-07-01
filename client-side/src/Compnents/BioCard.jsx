import { IoShareSocialOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const BioCard = ({ card }) => {
    const { profileIMG, biodataId, type, permanentDivision, occupation, age } = card;

    return (
        <div className='m-2 p-5 w-60 lg:w-80 border-2 bg-white mx-auto sm:m-2 rounded-lg shadow-xl'>
            <div>
                <img src={profileIMG} className="border" />
                <p className="text-center text-lg font-semibold">Biodata no: {biodataId}</p>
            </div>
            <div className="my-3">
                <table className="w-full">
                    <thead>
                        <tr>
                            <th className="border-2 border-l-0 p-2 text-left font-semibold">Type</th>
                            <td className="border-2 border-r-0 p-2">{type}</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th className="border-2 border-l-0 p-2 text-left font-semibold w-1/2">Division</th>
                            <td className="border-2 border-r-0 p-2">{permanentDivision}</td>
                        </tr>
                        <tr>
                            <th className="border-2 border-l-0 p-2 text-left font-semibold">Age</th>
                            <td className="border-2 border-r-0 p-2">{age}</td>
                        </tr>
                        <tr>
                            <th className="border-2 border-l-0 p-2 text-left font-semibold">Occupation</th>
                            <td className="border-2 border-r-0 p-2">{occupation}</td>
                        </tr>
                    </tbody>

                </table>
            </div>
            <div className="flex justify-between gap-2">
                <button className="SSBtnOutline">
                    <IoShareSocialOutline className="inline-block align-baseline mr-2"></IoShareSocialOutline>
                    Share
                </button>
                <Link to={`/biodatas/${biodataId}`} className="SSBtn text-center">View Biodata</Link>
            </div>
        </div>
    );
};

export default BioCard;
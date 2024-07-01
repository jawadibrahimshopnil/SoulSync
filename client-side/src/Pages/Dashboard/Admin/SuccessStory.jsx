import Swal from "sweetalert2";
import useSuccStory from "../../../Hooks/useSuccStory";
import Loading from "../../../Compnents/Loading";


const SuccessStory = () => {
    const [stories, storyLoading] = useSuccStory();
    if(storyLoading){
        return <Loading />
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-center text-3xl font-semibold mb-4">Success Story</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead className="bg-rose-600 text-white">
                        <tr>
                            <th className="py-3 px-4">Male ID</th>
                            <th className="py-3 px-4">Female ID</th>
                            <th className="py-3 px-4 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            stories.map((story, idx) => (
                                <tr key={idx} className="border-b hover:bg-rose-100 text-center">
                                    <td className="py-3 px-4">{story.maleBio}</td>
                                    <td className="py-3 px-4">{story.femaleBio}</td>
                                    <td className="py-3 px-4 text-center">
                                        <button onClick={()=>{
                                            Swal.fire({
                                                title: "Story",
                                                text: story.story,
                                              });
                                        }} className="bg-rose-600 text-white px-3 py-1 rounded">View Story</button>
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

export default SuccessStory;
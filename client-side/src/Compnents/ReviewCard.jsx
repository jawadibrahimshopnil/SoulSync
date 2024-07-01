import { Rating } from '@smastrom/react-rating';

const ReviewCard = ({story}) => {
    const {coupleIMG, marriageDate, rating, story:marriageStory} = story;
    return (
        <div className="container flex flex-col w-full max-w-lg p-6 mx-auto divide-y rounded-lg divide-gray-300 border-2 shadow-md">
            <div className="flex justify-center p-4">
                <div className="text-center">
                    <div>
                        <img src={coupleIMG} alt="" className="object-cover bg-gray-500 w-60" />
                    </div>
                    <div>
                        <span className="">Marriage Date: {marriageDate}</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                        Rating: 
                        <Rating
                            style={{ maxWidth: 120 }}
                            value={rating}
                            readOnly
                        />
                        
                    </div>
                </div>

            </div>
            <div className="p-4 space-y-2 text-sm text-gray-600 text-center">
                <p>{marriageStory}</p>
            </div>
        </div>
    );
};

export default ReviewCard;
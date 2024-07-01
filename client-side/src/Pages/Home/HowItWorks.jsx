import { BsBalloonHeartFill, BsPostcardHeartFill, BsSearchHeartFill } from "react-icons/bs";
import { RiLoginCircleFill } from "react-icons/ri";

const HowItWorks = () => {
    return (
        <div id="howitworks" className="bg-gray-100 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold mb-8 text-center">How It Works</h2>
                <div className="space-y-8 md:space-y-0 md:grid md:grid-cols-4 md:gap-8">
                    {/* Step 1 */}
                    <div className="">
                        <div className="flex flex-col items-center">
                            <div>
                                <RiLoginCircleFill className="w-20 h-20 text-rose-700" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2 text-center">Create Your Profile</h3>
                            <p className="text-gray-600 text-center">Sign up and create your profile with details about yourself.</p>
                        </div>
                    </div>
                    {/* step 2 */}
                    <div className="">
                        <div className="flex flex-col items-center">
                            <div>
                            <BsSearchHeartFill className="w-20 h-20 text-rose-700" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2 text-center">Find Your Match</h3>
                            <p className="text-gray-600 text-center">Explore a curated selection of profiles to find someone who truly resonates with you.</p>
                        </div>
                    </div>
                    {/* step 3 */}
                    <div className="">
                        <div className="flex flex-col items-center">
                            <div>
                            <BsPostcardHeartFill className="w-20 h-20 text-rose-700" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2 text-center">Request Contact</h3>
                            <p className="text-gray-600 text-center">Express your interest by sending a contact request to profiles that catch your eye.</p>
                        </div>
                    </div>
                    {/* step 4 */}
                    <div className="">
                        <div className="flex flex-col items-center">
                            <div>
                            <BsBalloonHeartFill className="w-20 h-20 text-rose-700" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2 text-center">Celebrate</h3>
                            <p className="text-gray-600 text-center">Start your new chapter together, hand in hand, after finding your perfect match.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HowItWorks;
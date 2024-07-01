import { BsPersonVcard } from "react-icons/bs";
import { GiDiamondRing } from "react-icons/gi";
import { IoFemale, IoMale } from "react-icons/io5";
import useStats from "../../Hooks/useStats";
import Loading from "../../Compnents/Loading";

const SuccessCounter = () => {
  const [stats, statsLoading] = useStats();
  if(statsLoading){
    return <Loading />
  }
  const {totalBio, maleBio, femaleBio, totalMarriage} = stats;
  
  return (
    <div id="achivement" className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Our Achievements</h2>
        <p className="text-gray-600 mb-8">Proudly sharing our success stories and milestones.</p>
        <section className="p-6 my-6">
          <div className="container grid grid-cols-1 gap-6 mx-auto sm:grid-cols-2 xl:grid-cols-4 ">
            <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 bg-gray-50 text-gray-800 border">
              <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 bg-default-600">
              <BsPersonVcard className="w-10 h-10" />
              </div>
              <div className="flex flex-col justify-center align-middle">
                <p className="text-3xl font-semibold leading-none">{totalBio}</p>
                <p className="capitalize">Biodatas</p>
              </div>
            </div>
            <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 bg-gray-50 border text-gray-800">
              <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 bg-default-600">
              <IoMale className="w-10 h-10" />
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-3xl font-semibold leading-none">{maleBio}</p>
                <p className="capitalize">Male</p>
              </div>
            </div>
            <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 bg-gray-50 border text-gray-800">
              <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 bg-default-600">
              <IoFemale className="w-10 h-10" />
              </div>
              <div className="flex flex-col justify-center align-middle">
                <p className="text-3xl font-semibold leading-none">{femaleBio}</p>
                <p className="capitalize">Female</p>
              </div>
            </div>
            <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 bg-gray-50 border text-gray-800">
              <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 bg-default-600">
              <GiDiamondRing className="w-10 h-10" />
              </div>
              <div className="flex flex-col justify-center align-middle">
                <p className="text-3xl font-semibold leading-none">{totalMarriage}</p>
                <p className="capitalize">Marriages</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SuccessCounter;
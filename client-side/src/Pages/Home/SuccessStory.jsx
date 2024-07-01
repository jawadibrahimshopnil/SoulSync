import ReviewCard from "../../Compnents/ReviewCard";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import useSuccStory from './../../Hooks/useSuccStory';
import Loading from "../../Compnents/Loading";

const SuccessStory = () => {
  const [stories, storyLoading] = useSuccStory();
  if (storyLoading) {
    return <Loading />
  }
  return (
    <div id="stories" className="bg-white py-8">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-center text-3xl font-bold sm:text-4xl">Success Stories</h2>
      <p className="text-center mt-2 text-lg text-gray-600">Read about our success stories from happy couples who found love through our platform.</p>
      <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper my-8"
    >
      {
        stories.map((story, idx)=><SwiperSlide key={idx}><ReviewCard story={story}></ReviewCard></SwiperSlide>)
      }
    </Swiper>
    </div>
  </div>

  );
};

export default SuccessStory;
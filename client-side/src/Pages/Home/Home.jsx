import HomeBanner from "./HomeBanner";
import HowItWorks from "./HowItWorks";
import SixPremiumBio from "./SixPremiumBio";
import SuccessCounter from "./SuccessCounter";
import SuccessStory from "./SuccessStory";


const Home = () => {
    return (
        <div>
            <HomeBanner></HomeBanner>
            <SixPremiumBio></SixPremiumBio>
            <HowItWorks></HowItWorks>
            <SuccessCounter></SuccessCounter>
            <SuccessStory></SuccessStory>
        </div>
    );
};

export default Home;
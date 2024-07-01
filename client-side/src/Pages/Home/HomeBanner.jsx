import { Link } from "react-router-dom";

const HomeBanner = () => {
    return (
        <div className="relative bg-cover bg-center py-36" style={{ backgroundImage: "url('bannerBG.jpg')" }}>
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Find Your Perfect Match with SoulSync</h1>
                <p className="text-base md:text-lg lg:text-xl mb-6 max-w-2xl mx-auto">
                    Its a place where love stories begin. With SoulSync, you can connect with like-minded individuals,
                    build meaningful relationships, and embark on your journey to a happily ever after. Join us today.
                </p>
                <Link to={"/biodatas"} className="bg-rose-600 hover:bg-rose-800 text-white font-bold py-2 px-4 rounded text-lg">
                    Get Started
                </Link>
            </div>
        </div>
    );
};

export default HomeBanner;
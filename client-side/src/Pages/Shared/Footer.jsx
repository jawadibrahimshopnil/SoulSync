import { FaTwitter } from "react-icons/fa";
import { IoLogoFacebook, IoLogoInstagram } from "react-icons/io5";
import { RiHeartsFill } from "react-icons/ri";

const Footer = () => {
    return (
        <footer className="px-4 divide-y bg-gray-100">
            <div className="container flex flex-col justify-between py-10 mx-auto space-y-8 lg:flex-row lg:space-y-0">
                <div className="lg:w-1/3">
                    <a className="flex justify-center space-x-3 lg:justify-start">
                        <div className='flex items-center'>
                            <RiHeartsFill className="text-rose-600 w-6 h-6 mr-3" />
                            <span className="bg-gradient-to-tr from-orange-400 to-rose-600 text-transparent bg-clip-text text-2xl font-bold">SoulSync</span>
                        </div>
                    </a>
                </div>
                <div className="grid grid-cols-2 text-sm gap-x-3 gap-y-8 lg:w-2/3 sm:grid-cols-4">
                    <div className="space-y-3">
                        <h3 className="tracking-wide uppercase font-semibold">Home</h3>
                        <ul className="space-y-1">
                            <li>
                                <a href="#premiumbios">Premium Biodata</a>
                            </li>
                            <li>
                                <a href="#achivement">Achivement</a>
                            </li>
                            <li>
                                <a href="#stories">Review</a>
                            </li>
                        </ul>
                    </div>
                    <div className="space-y-3">
                        <h3 className="tracking-wide uppercase font-semibold">About Us</h3>
                        <ul className="space-y-1">
                            <li>
                                <a href="#howitworks">How It Works</a>
                            </li>
                            <li>
                                <a href="/aboutus/">Our History</a>
                            </li>
                        </ul>
                    </div>
                    <div className="space-y-3">
                        <h3 className="uppercase font-semibold">Contact Us</h3>
                        <ul className="space-y-1">
                            <li>
                                <a>Email: soulsync@gmail.com</a>
                            </li>
                            <li>
                                <a>Mobile: +880 1234567890</a>
                            </li>
                            <li>
                                <a>Socials</a>
                            </li>
                        </ul>
                    </div>
                    <div className="space-y-3">
                        <div className="uppercase font-semibold">Social media</div>
                        <div className="flex justify-start space-x-3">
                            <a title="Facebook" className="flex items-center p-1">
                                <IoLogoFacebook className="SSIcon" />
                            </a>
                            <a title="Twitter" className="flex items-center p-1">
                                <FaTwitter className="SSIcon" />
                            </a>
                            <a title="Instagram" className="flex items-center p-1">
                                <IoLogoInstagram className="SSIcon" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-6 text-sm text-center text-gray-600">© 2024 Company Co. All rights reserved.</div>
        </footer>
    );
};

export default Footer;
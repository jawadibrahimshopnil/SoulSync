import { Link, NavLink } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import { FaBars } from 'react-icons/fa';
import { RiHeartsFill } from 'react-icons/ri';
import { IoLogInOutline, IoLogOutOutline } from 'react-icons/io5';
import useAdmin from '../../Hooks/useAdmin';

const NavBar = () => {
    const { user, logOutUser } = useContext(AuthContext);
    const [open, setOpen] = useState(false);
    const [isAdmin] = useAdmin();
    const navLinks = <>
        <li className='m-2'><NavLink className='SSBtnOutline inline-block w-full' to=''>Home</NavLink></li>
        <li className='m-2'><NavLink className='SSBtnOutline inline-block w-full' to='/biodatas'>Biodatas</NavLink></li>
        <li className='m-2'><NavLink className='SSBtnOutline inline-block w-full' to='/aboutus'>AboutUs</NavLink></li>
        <li className='m-2'><NavLink className='SSBtnOutline inline-block w-full' to='/contactus'>ContactUs</NavLink></li>

        {
            user ? <>
            {
                isAdmin ? <li className='m-2'><NavLink className='SSBtnOutline inline-block w-full' to='/dashboard/admin-home'>Dashboard</NavLink></li>
                :
                <li className='m-2'><NavLink className='SSBtnOutline inline-block w-full' to='/dashboard/editbio'>Dashboard</NavLink></li>
            }
                
                <li className='m-2'> <button onClick={logOutUser} className='SSBtn bg-rose-600 text-white font-semibold'> <IoLogOutOutline className='SSIcon inline' /> Logout</button></li> </>
                :
                <li className='m-2'>
                    <Link to='/login' className='SSBtn bg-rose-600 text-white font-semibold'><IoLogInOutline className='SSIcon inline' /> Login</Link></li>
        }
    </>
    return (
        <div className='shadow-md w-full sticky z-50 top-0 left-0'>
            <div className='md:flex items-center justify-between bg-white py-4 md:px-10 px-7'>
                {/* logo */}
                <div className='flex items-center'>
                    <RiHeartsFill className="text-rose-600 w-6 h-6 mr-3" />
                    <span className="bg-gradient-to-tr from-orange-400 to-rose-600 text-transparent bg-clip-text text-2xl font-bold">SoulSync</span>
                </div>

                {/* res toggle btn */}
                <div onClick={() => setOpen(!open)} className='text-3xl absolute right-8 top-6 cursor-pointer md:hidden'>
                    <FaBars name={open ? 'close' : 'menu'}></FaBars>
                </div>

                {/* navlinks */}
                <ul className={`md:flex md:items-center md:w-auto md:static absolute bg-white w-full ${open ? 'top-16 left-0' : 'top-[-490px]'}`}>
                    {navLinks}
                </ul>
            </div>
        </div>
    );
};

export default NavBar;
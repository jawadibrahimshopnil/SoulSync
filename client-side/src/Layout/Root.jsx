import { Outlet } from 'react-router-dom';
import Footer from '../Pages/Shared/Footer';
import NavBar from '../Pages/Shared/NavBar';

const Root = () => {
    return (
        <div>
            <NavBar></NavBar>
            <div className=''>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Root;
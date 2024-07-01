import { Outlet } from 'react-router-dom';
import { DashSidebar } from '../Pages/Dashboard/User/Sidebar/DashSidebar';

const Dashboard = () => {
    return (
        <div className="flex">
            <div>
                <DashSidebar></DashSidebar>
            </div>
            <div className="h-screen overflow-hidden overflow-y-scroll w-full bg-gray-100 ">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;
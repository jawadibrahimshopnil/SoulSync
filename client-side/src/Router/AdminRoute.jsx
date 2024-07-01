import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';
import useAdmin from '../Hooks/useAdmin';
import Loading from '../Compnents/Loading';

const AdminRoute = ({children}) => {
    const {user, loading} = useAuth();
    const [isAdmin, adminLoading] = useAdmin();
    const location = useLocation();
    if(loading || adminLoading){
        return <Loading />
    }
    if(user && isAdmin){
        return children
    }
    return <Navigate to={'/login'} state={{from: location}}></Navigate>;
};

export default AdminRoute;
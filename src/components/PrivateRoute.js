import {Outlet, Navigate} from 'react-router-dom';
import { useAuth } from '../auth/Auth';

const PrivateRoute = () => {
    const { isAuthenticated, setAuthenticated } = useAuth();

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;
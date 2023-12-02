import { Navigate, Outlet } from 'react-router-dom';
import authService from '../services/authService';

const ProtectedRoutes = ({ isSignedIn }) => {
    return isSignedIn ? <Outlet /> : <Navigate to='/signin' />
}

export default ProtectedRoutes;
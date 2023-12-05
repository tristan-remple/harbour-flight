import { Navigate, Outlet } from 'react-router-dom';
import authService from '../services/authService';

// this could check the state or the session, but the session might be more reliable
const ProtectedRoutes = () => {
    return authService.isSignedIn() ? <Outlet /> : <Navigate to='/signin' />
}

export default ProtectedRoutes;
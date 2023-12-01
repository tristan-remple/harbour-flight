import { Link } from 'react-router-dom';
import authService from '../services/authService';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';

const UserControls = () => {

    // this isnt affected when the user signed in
    // should we be using state instead of session storage, or in addition to?
    const [ isSignedIn, setIsSignedIn ] = useState(sessionStorage.getItem("signedIn"));

    const navigate = useNavigate();

    const signOut = () => {
        authService.signOut();
        setIsSignedIn(false);
        navigate("/");
    }

    if (isSignedIn) {
        return (
            <li className="nav-item active">
                <div className="nav-link" onClick={signOut}>Sign Out</div>
            </li>
        )
    } else {
        return (
            <li className="nav-item dropdown">
                <div className="nav-link dropdown-toggle" id="dropdown07" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Join Us</div>
                <div className="dropdown-menu bg-dark" aria-labelledby="dropdown07">
                    <Link className="nav-link" to="/signin">Sign In</Link>
                    <Link className="nav-link" to="/register">Register</Link>
                </div>
            </li>
        )
    }
    
}

export default UserControls;
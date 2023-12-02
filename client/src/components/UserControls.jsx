import { Link } from 'react-router-dom';
import authService from '../services/authService';
import { useNavigate } from "react-router-dom";


const UserControls = ({ setStatus, isSignedIn, toggle }) => {

    const navigate = useNavigate();

    const signOut = () => {
        if (isSignedIn) {
            authService.signOut((result) => {
                let newStatus;
                if (result[0]) {
                    newStatus = {
                        message: "Good bye for now.",
                        type: "success"
                    }
                    setStatus(newStatus);
                    toggle();
                    navigate("/");
                } else {
                    newStatus = {
                        message: result[1],
                        type: "warning"
                    }
                    setStatus(newStatus);
                }
            });
            
        }
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
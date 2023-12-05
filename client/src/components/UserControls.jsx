import { Link } from 'react-router-dom';
import authService from '../services/authService';
import { useNavigate, useLocation } from "react-router-dom";

// this is a fragment of the navbar that displays user controls
const UserControls = ({ setStatus, }) => {

    useLocation();
    const navigate = useNavigate();

    // sign out doesn't need to be a separate page, so it's handled here
    const signOut = () => {
        console.log("Signing out");

        // auth service signs out of the api and session
        authService.signOut((result) => {
            console.log(result);
            let newStatus;
            if (result[0]) {
                // this function handles signing out of state
                newStatus = {
                    message: "Good bye for now.",
                    type: "success"
                }
                setStatus(newStatus);

                // returns to the home page
                navigate("/");
            } else {
                // if auth service fails for some reason, tell me why
                newStatus = {
                    message: result[1],
                    type: "warning"
                }
                setStatus(newStatus);
            }
        });

    }

    // if the user is signed in, allow them to sign out
    if (authService.isSignedIn()) {
        return (
            <li className="nav-item dropdown">
                <div className="nav-link dropdown-toggle" id="dropdown06" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{ authService.currentUser() }</div>
                <div className="dropdown-menu bg-dark" aria-labelledby="dropdown06">
                    <div className="nav-link" onClick={signOut} >Sign Out</div>
                </div>
            </li>
        )
    } else {
        // otherwise, display a dropdown with sign in and register options
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
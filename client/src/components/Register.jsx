import React from 'react';
import '../css/signin.css';
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

import Alert from './Alert';
import authService from '../services/authService';

const Register = ({ status, setStatus, toggle }) => {

    // set up navigation
    const navigate = useNavigate();

    // bring in our form elements
    const { register, handleSubmit, formState: { errors } } = useForm();

    // this function is called when a user hits submit
    function sendCredentials(creds) {

        // send their credentials to the auth service
        // receive back a result: [success boolean, message string]
        authService.register(creds, (result) => {

            // status refers to the messages stored in state
            let newStatus;

            // if [success] is true
            if (result[0]) {
                console.log(result);

                // set the new status
                // message string is null in this case, it's set here instead of by the api
                newStatus = {
                    message: "Thank you for registering.",
                    type: "success"
                }
                setStatus(newStatus);
                toggle();

                // navigate to home
                navigate("/");
            } else {
                console.log(result);

                // if there's an error, we display the api error message in a warning box
                newStatus = {
                    message: result[1],
                    type: "warning"
                }
                setStatus(newStatus);
            }
        });
    }

    // return jsx form
    return ( 
        <form className="form-signin" onSubmit={handleSubmit(sendCredentials)}>
            <Alert message={status.message} type={status.type} />
            <h1 className="h3 mb-3 font-weight-normal text-center">Register</h1>
            <label htmlFor="inputFirst" className="sr-only">First Name</label>
            <input 
                type="text"
                id="inputFirst"
                className="form-control"
                placeholder="First Name"
                {...register("firstName")}
            />
            <label htmlFor="inputLast" className="sr-only">Last Name</label>
            <input 
                type="text"
                id="inputLast"
                className="form-control"
                placeholder="Last Name"
                {...register("lastName")}
            />
            <label htmlFor="inputEmail" className="sr-only">Email Address</label>
            <input 
                type="email"
                id="inputEmail"
                className="form-control"
                placeholder="Email address"
                {...register("email")}
            />
            <label htmlFor="inputPassword" className="sr-only">Password</label>
            <input
                type="password"
                id="inputPassword"
                className="form-control"
                placeholder="Password"
                {...register("password")}
            />
            <button className="btn btn-lg btn-primary btn-block" type="submit">Register</button>
            <Link className="btn btn-lg btn-secondary btn-block" to="/signin">Already a User?</Link>
        </form>
     );
}

// export the component
export default Register;
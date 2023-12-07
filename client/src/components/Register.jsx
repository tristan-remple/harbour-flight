import React from 'react';
import '../css/signin.css';
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

import Alert from './Alert';
import Input from './Input';
import authService from '../services/authService';

const Register = ({ status, setStatus, clearStatus }) => {

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
        <div className="card m-3">
            <h2 className="card-header">Register</h2>
        <form className="card-body" onSubmit={handleSubmit(sendCredentials)}>
            <Alert message={status.message} type={status.type} />
            <Input 
                name="firstName"
                title="First Name"
                type="text"
                register={register}
                error={errors.firstName && errors.firstName.message}
            />
            <Input 
                name="lastName"
                title="Last Name"
                type="text"
                register={register}
                error={errors.lastName && errors.lastName.message}
            />
            <Input 
                name="email"
                title="Email"
                type="email"
                register={register}
                error={errors.email && errors.email.message}
            />
            <Input 
                name="password"
                title="Password"
                type="password"
                register={register}
                error={errors.password && errors.password.message}
            />
            <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={() => clearStatus()}>Register</button>
            <Link className="btn btn-lg btn-secondary btn-block" to="/signin" onClick={() => clearStatus()}>Already a User?</Link>
        </form>
        </div>
     );
}

// export the component
export default Register;
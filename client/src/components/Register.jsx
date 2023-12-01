import React from 'react';
import '../css/signin.css';
import { useForm } from 'react-hook-form';
// import axios from 'axios';
import { Navigate, useNavigate } from "react-router-dom";
// import { CookiesProvider, useCookies } from 'react-cookie';

import Alert from './Alert';

const SignIn = props => {

    const navigate = useNavigate();

    // bring in our form elements
    const { register, handleSubmit, formState: { errors } } = useForm();
    // const [ cookies, setCookie ] = useCookies(["jwt"]);

    // // this function is called by react-hook-form when the form is submitted
    // const sendCredentials = creds => {

    //     // set axios to use credentials so we can have cross-origin authentication
    //     // set the validator to true so that we get api response errors instead of axios-generated errors on codes other than 200
    //     const axiosOptions = {
    //         withCredentials: true,
    //         validateStatus: (status) => {
    //             return true;
    //         }
    //     }

    //     // axio post request containing the user creds and the options listed above
    //     axios.post(`${import.meta.env.VITE_API_URL}/users/register`, creds, axiosOptions).then(response => {

    //         // new status will be set to the alert component
    //         let newStatus;

    //         // we're expecting a 201, but any 2xx code will generate a success message
    //         if (response.status >= 200 && response.status < 300) {
    //             newStatus = {
    //                 message: "Thank you for registering.",
    //                 type: "success"
    //             }
    //         } else {

    //             // if the response status is over 300, return the body of the response to the user
    //             // this will be an api-generated error
    //             newStatus = {
    //                 message: response.data,
    //                 type: "warning"
    //             }
    //         }

    //         // set the status to state
    //         props.onSubmit(newStatus);
    //     }).catch(err => {

    //         // if the request fails completely
    //         console.log(err);

    //         // hopefully this message will never be displayed
    //         newStatus = {
    //             message: "Something went wrong.",
    //             type: "warning"
    //         }
    //         props.onSubmit(newStatus);
    //     });
    // }

    // // if the state message is of type success, the user has successfully signed in
    // // so we should redirect them to the homepage with react-router's Navigate
    // if (props.status.type === "success") {
    //     return <Navigate to="/" replace={true} />
    // }

    function sendCredentials(creds) {
        authService.register(creds, (status) => {
            if (status) {
                console.log("Success");
                navigate("/");
            } else {
                console.log("No success");
            }
        });
    }

    // this return is only hit if the success return is not
    return ( 
        <form className="form-signin" onSubmit={handleSubmit(sendCredentials)}>
            <Alert message={props.status.message} type={props.status.type} />
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
        </form>
     );
}

// export the component
export default SignIn;
import React from 'react';
import '../css/signin.css';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { CookiesProvider, useCookies } from 'react-cookie';
import { Navigate } from "react-router-dom";

import Alert from './Alert';

const SignIn = props => {

    // bring in react hook form functionality
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [ cookies, setCookie ] = useCookies(["jwt"]);

    // set axios to identify where it's sending requests from and accept all status codes
    const axiosOptions = {
        withCredentials: true,
        validateStatus: (status) => {
            return true;
        }
    }

    // the function that react hook form calls
    const sendCredentials = creds => {

        // axios post request
        axios.post("http://localhost:5000/api/users/login", creds, axiosOptions).then(response => {

            // set the status in state to let the user know how their submission went
            let newStatus;
            if (response.status >= 200 && response.status < 300) {
                newStatus = {
                    message: "Thank you for signing in.",
                    type: "success"
                }
            } else {
                newStatus = {
                    message: response.data,
                    type: "warning"
                }
            }
            props.onSubmit(newStatus);
        }).catch(err => {

            // if the request fails completely
            console.log(err);

            // hopefully this message will never be displayed
            newStatus = {
                message: "Something went wrong.",
                type: "warning"
            }
            props.onSubmit(newStatus);
        });
    }

    // if the user has just succeeded, redirect them to the main page
    if (props.status.type === "success") {
        return <Navigate to="/" replace={true} />
    }

    // otherwise, display the form
    return ( 
        <form className="form-signin" onSubmit={handleSubmit(sendCredentials)}>
            <Alert message={props.status.message} type={props.status.type} />
            <h1 className="h3 mb-3 font-weight-normal text-center">Please sign in</h1>
            <label htmlFor="inputEmail" className="sr-only">Email address</label>
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
            <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
        </form>
    );
}
 
export default SignIn;
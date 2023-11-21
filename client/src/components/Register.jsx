import React from 'react';
import '../css/signin.css';
import { useForm } from 'react-hook-form';
import axios from 'axios';
// import { CookiesProvider, useCookies } from 'react-cookie';

import Alert from './Alert';

const SignIn = props => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    // const [ cookies, setCookie ] = useCookies(["jwt"]);

    const sendCredentials = creds => {

        const axiosOptions = {
            withCredentials: true,
            validateStatus: (status) => {
                return true;
            }
        }
        axios.post("http://localhost:5000/api/users/register", creds, axiosOptions).then(response => {
            let newStatus;
            if (response.status >= 200 && response.status < 300) {
                newStatus = {
                    message: "Thank you for registering.",
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
            console.log(err);
        });
    }

    if (props.status.type === "success") {
        return <Navigate to="/" replace={true} />
    }
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
 
export default SignIn;
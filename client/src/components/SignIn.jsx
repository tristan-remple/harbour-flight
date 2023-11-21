import React from 'react';
import '../css/signin.css';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { CookiesProvider, useCookies } from 'react-cookie';

const SignIn = props => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [ cookies, setCookie ] = useCookies(["jwt"]);

    const sendCredentials = creds => {
        axios.post("http://localhost:5000/api/users/login", creds, { withCredentials: true }).then(response => {
            console.log(response);
        }).catch(err => {
            console.log(err);
        });
    }

    return ( 
        <form className="form-signin" onSubmit={handleSubmit(sendCredentials)}>
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
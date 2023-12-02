import axios from 'axios';

// everything to do with authentication happens here
class authService {

    // validate whether or not a user is signed in
    isSignedIn() {
        // check in session
        return sessionStorage.getItem("signedIn") === "true";
    }

    // sign a user out (of the api and session)
    signOut(callback) {

        // set axios to identify where it's sending requests from and accept all status codes
        const axiosOptions = {
            withCredentials: true,
            validateStatus: (status) => {
                return true;
            }
        }

        // post to the api to remove the http-only cookie
        axios.post(`${import.meta.env.VITE_API_URL}/users/logout`, '', axiosOptions).then(response => {

            switch (response.status) {
                case 204:
                    // 204: successful with no content
                    // if successful, alter the session as well
                    sessionStorage.removeItem('signedIn');

                    // return the success to the component so it can update state and set a message
                    callback([true, null]);
                    break;
                default:

                    // if the api call fails, tell me why
                    callback([false, response.data]);
                    break;
            }
        })
    }

    // sign a user in to the api and session
    signIn(creds, callback) {

        // set axios to identify where it's sending requests from and accept all status codes
        const axiosOptions = {
            withCredentials: true,
            validateStatus: (status) => {
                return true;
            }
        }

        // post the input credentials to the api
        axios.post(`${import.meta.env.VITE_API_URL}/users/login`, creds, axiosOptions).then(response => {
            switch (response.status) {
                case 200: {
                    // if it's successful, set the session variable
                    sessionStorage.setItem("signedIn", "true");

                    // inform the component of the success
                    callback([true, null]);
                    break;
                }
                default: {

                    // if it fails, tell the component why
                    callback([false, response.data]);
                    break;
                }
            }
        });
    }

    // register a new user and sign them in
    register(creds, callback) {

        // set axios to identify where it's sending requests from and accept all status codes
        const axiosOptions = {
            withCredentials: true,
            validateStatus: (status) => {
                return true;
            }
        }

        // send a request to the api with provided credentials
        axios.post(`${import.meta.env.VITE_API_URL}/users/register`, creds, axiosOptions).then(response => {
            switch (response.status) {
                case 201: {

                    // 201: successfully created
                    // set the session storage and inform the component
                    sessionStorage.setItem("signedIn", "true");
                    callback([true, null]);
                    break;
                }
                default: {

                    // otherwise, an error that the component needs to know about
                    callback([false, response.data]);
                    break;
                }
            }
        });
    }

}

// export an instance
export default new authService();
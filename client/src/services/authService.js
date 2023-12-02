import axios from 'axios';

// everything to do with authentication happens here
class authService {

    isSignedIn() {
        return sessionStorage.getItem("signedIn") === "true";
    }

    signOut(callback) {

        // set axios to identify where it's sending requests from and accept all status codes
        const axiosOptions = {
            withCredentials: true,
            validateStatus: (status) => {
                return true;
            }
        }

        axios.post(`${import.meta.env.VITE_API_URL}/users/logout`, '', axiosOptions).then(response => {
            switch (response.status) {
                case 204:
                    sessionStorage.removeItem('signedIn');
                    callback([true, null]);
                    break;
                default:
                    callback([false, response.data]);
                    break;
            }
        })
    }

    signIn(creds, callback) {

        const axiosOptions = {
            withCredentials: true,
            validateStatus: (status) => {
                return true;
            }
        }

        axios.post(`${import.meta.env.VITE_API_URL}/users/login`, creds, axiosOptions).then(response => {
            switch (response.status) {
                case 200: {
                    sessionStorage.setItem("signedIn", "true");
                    callback([true, null]);
                    break;
                }
                default: {
                    callback([false, response.data]);
                    break;
                }
            }
        });
    }

    register(creds, callback) {
        const axiosOptions = {
            withCredentials: true,
            validateStatus: (status) => {
                return true;
            }
        }

        axios.post(`${import.meta.env.VITE_API_URL}/users/register`, creds, axiosOptions).then(response => {
            switch (response.status) {
                case 201: {
                    sessionStorage.setItem("signedIn", "true");
                    callback([true, null]);
                    break;
                }
                default: {
                    callback([false, response.data]);
                    break;
                }
            }
        });
    }

}

// export an instance
export default new authService();
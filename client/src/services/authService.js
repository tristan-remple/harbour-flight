import axios from 'axios';

// everything to do with authentication happens here
class authService {

    isSignedIn() {

    }

    signOut() {

    }

    signIn(creds, callback) {
        // set axios to identify where it's sending requests from and accept all status codes
        const axiosOptions = {
            withCredentials: true,
            validateStatus: (status) => {
                return true;
            }
        }

        axios.post(`${import.meta.env.VITE_API_URL}/users/login`, creds, axiosOptions).then(response => {
            switch (response.status) {
                case 200: {
                    callback(true);
                    break;
                }
                case 400: {
                    callback(false);
                    break;
                }
                case 401: {
                    callback(false);
                    break;
                }
                case 500: {
                    callback(false);
                    break;
                }
            }
        });
    }

    register() {

    }

}

// export an instance
export default new authService();
import { useEffect } from 'react';
import axios from 'axios';

class apiService {

    // set axios options
    axiosOptions = {
        withCredentials: true,
        validateStatus: (status) => {
            return true;
        }
    }

    // abbreviate api url
    url = import.meta.env.VITE_API_URL;

    // make an api call to retrieve all birds
    getBirds(deleteCount, callback) {
        
        // use effect two arguments: function. condition for rerunning the function.
        // in this case we only want to run the function once
        useEffect(() => {

            // use axios to call the bird data and return it to main
            axios.get(`${this.url}/birds`, this.axiosOptions).then(response => {
                switch (response.status) {
                    case 200: {
                        // inform the component of the success and return data
                        callback([true, response.data]);
                        break;
                    }
                    default: {
                        // if it fails, tell the component why
                        callback([false, response.data]);
                        break;
                    }
                } // end switch
            }).catch(err => {
                console.log(err);
            })
        }, [deleteCount]);
    }

    // get one specific bird
    getOneBird(birdId, callback) {
        // use effect two arguments: function. condition for rerunning the function.
        // in this case we only want to run the function once
        useEffect(() => {

            // use axios to call the bird data and return it to main
            axios.get(`${this.url}/birds/${birdId}`, this.axiosOptions).then(response => {
                switch (response.status) {
                    case 200: {
                        // inform the component of the success and return data
                        callback([true, response.data]);
                        break;
                    }
                    default: {
                        // if it fails, tell the component why
                        callback([false, response.data]);
                        break;
                    }
                } // end switch
            }).catch(err => {
                console.log(err);
            })
        }, []);
    }

    // send a new bird to the api
    createBird(birdData, callback) {
        axios.post(`${this.url}/birds`, birdData, this.axiosOptions).then(response => {
            switch (response.status) {
                case 201: {
                    // inform the component of the success
                    callback([true, null]);
                    break;
                }
                default: {
                    // if it fails, tell the component why
                    console.log(response);
                    callback([false, response.data]);
                    break;
                }
            } // end switch
        }); // end axios
    }

    // change the data on a specific bird
    editBird(birdId, birdData, callback) {
        axios.patch(`${this.url}/birds/${birdId}`, birdData, this.axiosOptions).then(response => {
            switch (response.status) {
                case 201: {
                    // inform the component of the success
                    callback([true, null]);
                    break;
                }
                default: {
                    // if it fails, tell the component why
                    console.log(response);
                    callback([false, response.data]);
                    break;
                }
            } // end switch
        }); // end axios
    }

    uploadImage(file, callback) {

        // we need to set an additional header for sending files
        const uploadOptions = {
            ...this.axiosOptions,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };
        
        // encase the file in formData to match the header
        const formData = new FormData();
        formData.append("photo", file);

        // send a request as normal
        axios.post(`${this.url}/birds/image`, formData, uploadOptions).then(response => {
            switch (response.status) {
                case 201: {
                    // inform the component of the success
                    callback([true, null]);
                    break;
                }
                default: {
                    // if it fails, tell the component why
                    console.log(response);
                    callback([false, response.data]);
                    break;
                }
            } // end switch
        })
    }

    deleteBird(birdId, callback) {
        axios.delete(`${this.url}/birds/${birdId}`, this.axiosOptions).then(response => {
            switch (response.status) {
                case 204: {
                    // inform the component of the success
                    callback([true, null]);
                    break;
                }
                default: {
                    // if it fails, tell the component why
                    console.log(response);
                    callback([false, response.data]);
                    break;
                }
            } // end switch
        })
    }

}

// export an instance
export default new apiService();
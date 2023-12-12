import { Link, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';

import Alert from './Alert';
import apiService from '../services/apiService';

export default function Details({ status, setStatus, clearStatus }) {

    const navigate = useNavigate();
    const { birdId } = useParams();

    // create the birds state
    const [ bird, setBird ] = useState([]);

    // call api service to retrieve data
    apiService.getOneBird(birdId, data => {
        if (data[0]) {
            setBird(data[1]);
        } else {
            // if there's an error, we display the api error message in a warning box
            const newStatus = {
                message: data[1],
                type: "warning"
            }
            setStatus(newStatus);
        }
    });

    // convert the scientific name from an object with many keys to a string of 3 latin words
    const noSub = ({subSpecies, species, ...rest}) => rest;
    const sciName = bird.scientificName ? Object.values(noSub({...bird.scientificName})).join(" ") : null;

    const deleteBird = (birdId, birdName) => {
        if (confirm(`Are you sure you want to delete ${birdName}?`)) {
            apiService.deleteBird(birdId, result => {
                // status refers to the messages stored in state
                let newStatus;

                // if [success] is true
                if (result[0]) {
                    console.log(result);

                    // set the new status
                    // message string is null in this case, it's set here instead of by the api
                    newStatus = {
                        message: `${birdName} has been deleted.`,
                        type: "success"
                    }
                    setStatus(newStatus);
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
            })
        }
    }

    return (
        <div className="w-50 m-auto">
            <Alert message={status.message} type={status.type} />
            <div className="card m-4 box-shadow">
            <img 
                className="card-img-top" 
                alt={bird.commonName} 
                style={{maxHeight: '70vh', width: '100%', display: 'block', objectFit: 'cover'}}
                src={`img/${bird.photo}`} 
                data-holder-rendered="true" />
            <div className="card-body">
                <h3>{bird.commonName}</h3>
                <p className="card-text">
                    <small className="text-muted">{bird.observations} observations</small><br />
                    {sciName}<br />
                    { sciName && <em>{bird.scientificName.species}</em> }
                </p>
                <div className="d-flex justify-content-between align-items-center">
                <div className="btn-group">
                    <Link to={`/`} className="btn btn-sm btn-outline-secondary" onClick={() => clearStatus()}>Return</Link>
                    <Link to={`/${bird._id}/edit`} className="btn btn-sm btn-outline-secondary" onClick={() => clearStatus()}>Edit</Link>
                    <div onClick={() => deleteBird(bird._id, bird.commonName)} className="btn btn-sm btn-outline-secondary">Delete</div>
                </div>
                </div>
            </div>  
            </div>
        </div>
    )
}
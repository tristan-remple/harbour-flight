import { Link } from 'react-router-dom';

import apiService from '../services/apiService';

export default function Card({ bird, setStatus, clearStatus, onDelete }) {

    // convert the scientific name from an object with many keys to a string of 3 latin words
    const noSub = ({subSpecies, species, ...rest}) => rest;
    const sciName = Object.values(noSub({...bird.scientificName})).join(" ");

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
                    onDelete();
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
        <div className="col-md-4">
            <div className="card mb-4 box-shadow">
            <img 
                className="card-img-top" 
                alt={bird.commonName} 
                style={{height: 225, width: '100%', display: 'block', objectFit: 'cover'}}
                src={`img/${bird.photo}`} 
                data-holder-rendered="true" />
            <div className="card-body">
                <h3>{bird.commonName}</h3>
                <p className="card-text">
                    <small className="text-muted">{bird.observations} observations</small><br />
                    {sciName}<br />
                    <em>{bird.scientificName.species}</em>
                </p>
                <div className="d-flex justify-content-between align-items-center">
                <div className="btn-group">
                    <Link to={`/${bird._id}`} className="btn btn-sm btn-outline-secondary" onClick={() => clearStatus()}>View</Link>
                    <Link to={`/${bird._id}/edit`} className="btn btn-sm btn-outline-secondary" onClick={() => clearStatus()}>Edit</Link>
                    <div onClick={() => deleteBird(bird._id, bird.commonName)} className="btn btn-sm btn-outline-secondary">Delete</div>
                </div>
                </div>
            </div>  
            </div>
        </div>
    )
}
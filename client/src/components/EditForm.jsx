import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from "react-router-dom";
import { useState } from 'react';

// the input fields felt repetitive so they've been componentized
import Input from './Input';
import Alert from './Alert';
import apiService from '../services/apiService';

const EditForm = ({ status, setStatus }) => {

    // bring in form stuff
    const { register, handleSubmit, formState: { errors } } = useForm();

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

    // function called on successful submit
    const processSubmit = (data) => {

        // destructure the data so that it fits the schema
        const {commonName, observations, order, family, genus, species} = data;
        const submitData =  { commonName,
            observations,
            scientificName: {
                order,
                family,
                genus,
                species
            }
        }

        apiService.editBird(birdId, submitData, result => {

            // status refers to the messages stored in state
            let newStatus;

            // if [success] is true
            if (result[0]) {
                console.log(result);

                // set the new status
                // message string is null in this case, it's set here instead of by the api
                newStatus = {
                    message: "The bird has been updated.",
                    type: "success"
                }
                setStatus(newStatus);

                // navigate to home
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

    };

    // jsx
    return (
        <div className="card m-3">
            <h2 className="card-header">Record a Bird</h2>
        <form className="card-body" onSubmit={handleSubmit(processSubmit)} >
            <Alert message={status.message} type={status.type} />
            <fieldset>
                <legend>Basics</legend>

                <Input 
                    name="commonName"
                    title="Common Name"
                    type="text"
                    register={register}
                    value={bird.commonName}
                    error={errors.commonName && errors.commonName.message}
                />

                <Input 
                    name="observations"
                    title="Observations"
                    type="number"
                    register={register}
                    value={bird.observations}
                    error={errors.observations && errors.observations.message}
                />
                
            </fieldset>
            <fieldset>
                <legend>Scientific Name</legend>

                <Input 
                    name="order"
                    title="Order"
                    type="text"
                    register={register}
                    value={bird.scientificName && bird.scientificName.order}
                    error={errors.order && errors.order.message}
                />

                <Input 
                    name="family"
                    title="Family"
                    type="text"
                    register={register}
                    value={bird.scientificName && bird.scientificName.family}
                    error={errors.family && errors.family.message}
                />

                <Input 
                    name="genus"
                    title="Genus"
                    type="text"
                    register={register}
                    value={bird.scientificName && bird.scientificName.genus}
                    error={errors.genus && errors.genus.message}
                />

                <Input 
                    name="species"
                    title="Species"
                    type="text"
                    register={register}
                    value={bird.scientificName && bird.scientificName.species}
                    error={errors.species && errors.species.message}
                />

            </fieldset>

            <input type="submit" className="btn btn-primary" />

        </form>
        </div>
    )
}

export default EditForm;
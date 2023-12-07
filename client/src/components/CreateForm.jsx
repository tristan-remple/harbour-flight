import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";

// the input fields felt repetitive so they've been componentized
import Input from './Input';
import Alert from './Alert';
import apiService from '../services/apiService';

const CreateForm = ({ status, setStatus }) => {

    // bring in form stuff
    const { register, handleSubmit, formState: { errors } } = useForm();

    const navigate = useNavigate();

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

        apiService.createBird(submitData, result => {

            // status refers to the messages stored in state
            let newStatus;

            // if [success] is true
            if (result[0]) {
                console.log(result);

                // set the new status
                // message string is null in this case, it's set here instead of by the api
                newStatus = {
                    message: "The new bird has been registered.",
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
                    error={errors.commonName && errors.commonName.message}
                />

                <Input 
                    name="observations"
                    title="Observations"
                    type="number"
                    register={register}
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
                    error={errors.order && errors.order.message}
                />

                <Input 
                    name="family"
                    title="Family"
                    type="text"
                    register={register}
                    error={errors.family && errors.family.message}
                />

                <Input 
                    name="genus"
                    title="Genus"
                    type="text"
                    register={register}
                    error={errors.genus && errors.genus.message}
                />

                <Input 
                    name="species"
                    title="Species"
                    type="text"
                    register={register}
                    error={errors.species && errors.species.message}
                />

            </fieldset>

            <input type="submit" className="btn btn-primary" />

        </form>
        </div>
    )
}

export default CreateForm;
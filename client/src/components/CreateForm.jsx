import { useForm } from 'react-hook-form';
import axios from 'axios';

// the input fields felt repetitive so they've been componentized
import Input from './Input';

const CreateForm = (props) => {

    // bring in form stuff
    const { register, handleSubmit, formState: { errors } } = useForm();

    // set api url and axios options
    const url = "http://localhost:5000/api/birds";
    const axiosOptions = {
        withCredentials: true,
        validateStatus: (status) => {
            return true;
        }
    }

    // function called on successful submit
    const processSubmit = (data) => {
        console.log(data);
        axios.post(url, data, axiosOptions).then(response => {
            console.log(response);
        });
    };

    // jsx
    return (
        <div className="card m-3">
            <h2 className="card-header">Record a Bird</h2>
        <form className="card-body" onSubmit={handleSubmit(processSubmit)} >
            <fieldset>
                <legend>Basics</legend>

                <Input 
                    name="commonName"
                    title="Common Name"
                    type="text"
                    register={register}
                />

                <Input 
                    name="observations"
                    title="Observations"
                    type="number"
                    register={register}
                />
                
            </fieldset>
            <fieldset>
                <legend>Scientific Name</legend>

                <Input 
                    name="order"
                    title="Order"
                    type="text"
                    register={register}
                />

                <Input 
                    name="family"
                    title="Family"
                    type="text"
                    register={register}
                />

                <Input 
                    name="genus"
                    title="Genus"
                    type="text"
                    register={register}
                />

                <Input 
                    name="species"
                    title="Species"
                    type="text"
                    register={register}
                />

            </fieldset>

            <input type="submit" className="btn btn-primary" />

        </form>
        </div>
    )
}

export default CreateForm;
import Input from './Input';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const CreateForm = (props) => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const url = "http://localhost:5000/api/birds";
    const axiosOptions = {
        withCredentials: true,
        validateStatus: (status) => {
            return true;
        }
    }

    const processSubmit = (data) => {
        console.log(data);
        axios.post(url, data, axiosOptions).then(response => {
            console.log(response);
        });
    };

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
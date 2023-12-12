import Alert from "./Alert";

// form field for the create form
// could be used for edit as well
const Input = ({ name, title, type, register, value, error }) => {

    // all fields except files are manditory
    // text fields can be 3-255 characters
    // numbers must be positive
    // messages display on all errors
    const validation = {
        required: `${title} is required.`
    }
    if (type === "text") {
        validation.maxLength = {
            value: 255,
            message: `${title} must have between 3 and 255 characters.`
        };
        validation.minLength = {
            value: 3,
            message: `${title} must have between 3 and 255 characters.`
        };
    } else if (type === "number") {
        validation.valueAsNumber = `${title} must be a positive number.`;
        validation.min = {
            value: 1,
            message: `${title} must be a positive number.`
        };
    } else if (type === "file") {
        validation.required = false;
    }

    return (
        <>
        <div className="row mb-3 mx-3">
            <label htmlFor={name} className="col-sm-2 col-form-label">
                {title}
            </label>
            <input 
                type={type} 
                id={name} 
                className="form-control col-sm-10"
                { ...register(name, validation) }
                defaultValue={value} 
            />
        </div>
        { error && <Alert message={error} type="warning" /> }
        </>
    )
}

export default Input;
const Input = ({ name, title, type, register }) => {
    return (
        <div className="row mb-3 mx-3">
            <label htmlFor={name} className="col-sm-2 col-form-label">
                {title}
            </label>
            <input 
                type={type} 
                id={name} 
                className="form-control col-sm-10"
                { ...register(name, { required: true }) } 
            />
        </div>
    )
}

export default Input;
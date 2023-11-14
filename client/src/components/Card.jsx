export default function Card({ bird }) {

    const noSub = ({subSpecies, species, ...rest}) => rest;
    const sciName = Object.values(noSub({...bird.scientificName})).join(" ");

    return (
        <div className="col-md-4" key={bird._id}>
            <div className="card mb-4 box-shadow">
            <img 
                className="card-img-top" 
                alt={bird.commonName} 
                style={{height: 225, width: '100%', display: 'block', objectFit: 'cover'}}
                src={`img/${bird.photo}`} 
                data-holder-rendered="true" />
            <div className="card-body">
                <p className="card-text">
                    <h3>{bird.commonName}</h3>
                    <small className="text-muted">{bird.observations} observations</small><br />
                    {sciName}<br />
                    <em>{bird.scientificName.species}</em>
                    
                </p>
                
                <div className="d-flex justify-content-between align-items-center">
                <div className="btn-group">
                    <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
                    <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
                    <button type="button" className="btn btn-sm btn-outline-secondary">Delete</button>
                </div>
                <small className="text-muted">9 mins</small>
                </div>
            </div>  
            </div>
        </div>
    )
}
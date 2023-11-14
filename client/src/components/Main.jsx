import { useEffect, useState } from 'react';
import '../css/main.css'
import 'font-awesome/css/font-awesome.min.css';
import axios from 'axios';

const Main = () => {

  const [ birds, setBirds ] = useState([]);

  // make an api call to retrieve all data
  // use effect two arguments: function. condition for rerunning the function.
  // in this case we only want to run the function once
  useEffect(() => {
    axios.get("http://localhost:5000/api/birds").then(response => {
      console.log(response.data);
      setBirds(response.data);
    }).catch(err => {
      console.log(err);
    })
  }, []);


    return ( 
      <div>
        <section className="jumbotron text-center">
          <div className="container">
            <div className="input-group">
              <input type="text" className="form-control" placeholder="Search this site" />
              <div className="input-group-append">
                <button className="btn btn-secondary" type="button">
                  <i className="fa fa-search"></i>
                </button>
              </div>
            </div>
          </div>
        </section>

        <div className="album py-5 bg-light">
          <div className="container">
            <div className="row">
              {
                birds.map(bird => {
                  return (
                    <div className="col-md-4" key={bird._id}>
                      <div className="card mb-4 box-shadow">
                        <img 
                          className="card-img-top" 
                          data-src="holder.js/100px225?theme=thumb&amp;bg=55595c&amp;fg=eceeef&amp;text=Thumbnail" 
                          alt="Thumbnail [100%x225]" 
                          style={{height: 225, width: '100%', display: 'block'}}
                          src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22382%22%20height%3D%22225%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20382%20225%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_16e231e5e51%20text%20%7B%20fill%3A%23eceeef%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A19pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_16e231e5e51%22%3E%3Crect%20width%3D%22382%22%20height%3D%22225%22%20fill%3D%22%2355595c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22126.96875%22%20y%3D%22120.9%22%3EThumbnail%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" 
                          data-holder-rendered="true" />
                        <div className="card-body">
                          <p className="card-text">{bird.commonName} This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
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
                  ) // end map return
                })
              }

              

            </div>
          </div>
        </div>
      </div>
    );
}
 
export default Main;
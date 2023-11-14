import { useEffect, useState } from 'react';
import '../css/main.css'
import 'font-awesome/css/font-awesome.min.css';
import axios from 'axios';
import Card from './Card.jsx';

const Main = () => {

  // create the birds state
  const [ birds, setBirds ] = useState([]);

  // make an api call to retrieve all data
  // use effect two arguments: function. condition for rerunning the function.
  // in this case we only want to run the function once
  useEffect(() => {

    // use axios to call the bird data and save it to state
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
                    <Card bird={bird} />
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
import { useState } from 'react';
import '../css/main.css'
import 'font-awesome/css/font-awesome.min.css';
// import axios from 'axios';

import Card from './Card';
import Alert from './Alert';
import apiService from '../services/apiService';

const Main = ({ status, setStatus }) => {

  // create the birds state
  const [ birds, setBirds ] = useState([]);
  const [ filteredBirds, setFilteredBirds ] = useState([]);

  // call api service to retrieve data
  apiService.getBirds(data => {
    if (data[0]) {
      setBirds(data[1]);
      setFilteredBirds(data[1]);
    } else {
      // if there's an error, we display the api error message in a warning box
      const newStatus = {
        message: data[1],
        type: "warning"
      }
      setStatus(newStatus);
    }
  });

  // this function goes through all the fields in a bird object
  // it returns a boolean based on whether ANY of those fields contain a given search term
  // https://stackoverflow.com/questions/8085004/iterate-through-nested-javascript-objects
  const iterate = (obj, term) => {
    let returnVal = false;
    returnVal = Object.keys(obj).some(key => {
      if (typeof obj[key] === 'string' && obj[key].includes(term)) {
        console.log(`${term} is in ${obj[key]}`);
        returnVal = true;
        return true;
      } else if (typeof obj[key] === 'object' && obj[key] !== null) {
        // recursive function
        return iterate(obj[key], term);
      }
    });
    return returnVal;
  }

  // this function is called when the search button is clicked
  const applyFilter = () => {

    // it gets the value of the search bar
    const searchKey = document.getElementById("search").value;

    // if the value is empty, show all birds
    if (searchKey == "") {
      setFilteredBirds(birds);
    } else {

      // otherwise, filter the birds by the term
      const newFilter = birds.filter(bird => {
        console.log(iterate(bird, searchKey));
        return iterate(bird, searchKey);
      });
      setFilteredBirds(newFilter);
    }
  }

    return ( 
      <>
        <section className="jumbotron text-center">
          <div className="container">
            <div className="input-group">
              <input type="text" className="form-control" placeholder="Search this site" id="search" />
              <div className="input-group-append">
                <button className="btn btn-secondary" type="button" onClick={applyFilter}>
                  <i className="fa fa-search"></i>
                </button>
              </div>
            </div>
          </div>
        </section>

        <div className="album py-5 bg-light">
        <Alert message={status.message} type={status.type} />
          <div className="container">
            <div className="row">
              {
                // instead of assigning the map to a variable, we can output it directly
                filteredBirds.map(bird => {
                  return (
                    <Card bird={bird} key={bird._id} setStatus={setStatus} />
                  )
                })
              }
            </div>
          </div>
        </div>

      </>
    );
}
 
export default Main;
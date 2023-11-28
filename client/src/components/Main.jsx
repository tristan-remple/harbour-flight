import { useEffect, useState } from 'react';
import '../css/main.css'
import 'font-awesome/css/font-awesome.min.css';
import axios from 'axios';
import { CookiesProvider, useCookies } from 'react-cookie';

import Card from './Card';
import Alert from './Alert';

const Main = (props) => {

  const [ cookies, setCookie ] = useCookies(["jwt"]);
  console.log(cookies);

  // create the birds state
  const [ birds, setBirds ] = useState([]);

  // make an api call to retrieve all data
  // use effect two arguments: function. condition for rerunning the function.
  // in this case we only want to run the function once
  useEffect(() => {

    // use axios to call the bird data and save it to state
    axios.get(`${import.meta.env.VITE_API_URL}/birds`).then(response => {
      // console.log(response.data);
      setBirds(response.data);
    }).catch(err => {
      console.log(err);
    })
  }, []);


    return ( 
      <>

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
        <Alert message={props.status.message} type={props.status.type} />
          <div className="container">
            <div className="row">
              {
                // instead of assigning the map to a variable, we can output it directly
                birds.map(bird => {
                  return (
                    <Card bird={bird} key={bird._id} />
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
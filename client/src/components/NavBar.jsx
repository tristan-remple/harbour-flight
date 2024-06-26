import React from 'react';
import { Link } from 'react-router-dom';
import UserControls from './UserControls';

// the props are used to determine whether the user options should be sign in & register or sign out
const NavBar = ({ setStatus, clearStatus }) => {

    return (
    <nav className="navbar navbar-expand-lg">
      <div className="container">
        <Link to="/#" className="navbar-brand d-flex align-items-center" onClick={() => clearStatus()}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" aria-hidden="true" className="mr-2" viewBox="0 0 24 24" focusable="false"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
          <strong>Harbour Flight</strong>
        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample07" aria-controls="navbarsExample07" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarsExample07">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link onClick={() => clearStatus()} className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item active">
              <Link onClick={() => clearStatus()} className="nav-link" to="/create">Create</Link>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto">
            <UserControls setStatus={setStatus} clearStatus={clearStatus} />
          </ul>
        </div>
      </div>
    </nav>
    );
}
 
export default NavBar;
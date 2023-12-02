import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import NavBar from './components/NavBar';
import Main from './components/Main';
import SignIn from './components/SignIn';
import Footer from './components/Footer';
import Register from './components/Register';
import ProtectedRoutes from './components/ProtectedRoutes';
import CreateForm from './components/CreateForm';

const App = () => {

  // status is our "flash message"
  // it's stored in state so that a message generated on register can display on main
  // but right now it's lingering much longer than i'd prefer
  const [ status, setStatus ] = useState({
    message: null,
    type: null
  });

  // if you store signed in in session only, then making changes to your sign in status does not affect the navbar items
  // if you store signed in in state only, then refreshing the page results in being signed out of the ui, but not the api
  // so i guess you need both
  const [ isSignedIn, setIsSignedIn ] = useState(sessionStorage.getItem("signedIn"));

  // validation happens before this function is called
  const toggleSignIn = () => {
    const newSignIn = isSignedIn ? false : true;
    setIsSignedIn(newSignIn);
  }

  // the status is passed into all three routes
  // but the main page does not need to be able to update the status
  return (
    <React.Fragment>
      <NavBar isSignedIn={isSignedIn} setStatus={setStatus} toggle={toggleSignIn} />
      <div id="main-content">
        <Routes>
          <Route path="/" element={<Main status={status} />} />
          <Route path="/signin" element={<SignIn status={status} setStatus={setStatus} toggle={toggleSignIn} />} />
          <Route path="/register" element={<Register status={status} setStatus={setStatus} toggle={toggleSignIn} />} />
          <Route element={<ProtectedRoutes isSignedIn={isSignedIn} />}>
            <Route path="/create" element={<CreateForm />} />
          </Route>
        </Routes>
      </div>
      <Footer />
    </React.Fragment>
  );
}

export default App

import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import NavBar from './components/NavBar';
import Main from './components/Main';
import SignIn from './components/SignIn';
import Footer from './components/Footer';
import Register from './components/Register';
import ProtectedRoutes from './components/ProtectedRoutes';
import CreateForm from './components/CreateForm';
import EditForm from './components/EditForm';
import Details from './components/Details';
import './css/custom.css'

const App = () => {

  // status is our flash message
  // it's stored in state so that a message generated on register can display on main etc
  const [ status, setStatus ] = useState({
    message: null,
    type: null
  });

  // called on any navigation that doesn't set a status
  const clearStatus = () => {
    setStatus({
      message: null,
      type: null
    });
  }

  // the status is passed into all routes
  return (
    <React.Fragment>
      <NavBar setStatus={setStatus} clearStatus={clearStatus} />
      <div id="main-content">
        <Routes>
          <Route path="/" element={<Main status={status} setStatus={setStatus} clearStatus={clearStatus} />} />
          <Route path="/signin" element={<SignIn status={status} setStatus={setStatus} clearStatus={clearStatus} />} />
          <Route path="/register" element={<Register status={status} setStatus={setStatus} clearStatus={clearStatus} />} />
          <Route path="/:birdId" element={<Details status={status} setStatus={setStatus} clearStatus={clearStatus} />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/create" element={<CreateForm status={status} setStatus={setStatus} clearStatus={clearStatus} />} />
            <Route path="/:birdId/edit" element={<EditForm status={status} setStatus={setStatus} clearStatus={clearStatus} />} />
          </Route>
        </Routes>
      </div>
      <Footer />
    </React.Fragment>
  );
}

export default App

import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import NavBar from './components/NavBar';
import Main from './components/Main';
import SignIn from './components/SignIn';
import Footer from './components/Footer';
import Register from './components/Register';
import ProtectedRoutes from './components/ProtectedRoutes';
import Create from './components/Create';

const App = () => {

  // status is our "flash message"
  // (it's probably stored for longer than a real flash message)
  // it's stored in state so that a message generated on register can display on main
  const [ status, setStatus ] = useState({
    message: null,
    type: null
  });

  // the status is passed into all three routes
  // but the main page does not need to be able to update the status
  return (
    <React.Fragment>
      <NavBar />
      <div id="main-content">
        <Routes>
          <Route path="/" element={<Main status={status} />} />
          <Route path="/signin" element={<SignIn status={status} onSubmit={setStatus} />} />
          <Route path="/register" element={<Register status={status} onSubmit={setStatus} />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/create" element={<Create />} />
          </Route>
        </Routes>
      </div>
      <Footer />
    </React.Fragment>
  );
}

export default App

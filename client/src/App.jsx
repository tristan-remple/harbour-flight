import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import NavBar from './components/NavBar';
import Main from './components/Main';
import SignIn from './components/SignIn';
import Footer from './components/Footer';
import Register from './components/Register';

const App = () => {

  const [ status, setStatus ] = useState({
    message: "",
    type: ""
  });

  return (
    <React.Fragment>
      <NavBar />
      <div id="main-content">
        <Routes>
          <Route path="/" element={<Main status={status} />} />
          <Route path="/signin" element={<SignIn status={status} onSubmit={setStatus} />} />
          <Route path="/register" element={<Register status={status} onSubmit={setStatus} />} />
        </Routes>
      </div>
      <Footer />
    </React.Fragment>
  );
}

export default App

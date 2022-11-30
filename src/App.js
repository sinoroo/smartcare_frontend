import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"
import Signin from './Sigin';
import Profile from './Profile';


function App() {
  const token = localStorage.getItem('accessToken');

  if(!token){
    return <Signin />;
  }

  return (
    <div className='wrapper'>
      <Router>
        <Routes>
          <Route path="/" element={ <Signin /> } />
          <Route path="/login" element={ <Signin /> } />
          <Route path="/profile" element={ <Profile /> } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

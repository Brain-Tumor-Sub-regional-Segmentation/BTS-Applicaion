//import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route,Routes} from 'react-router-dom';
import SignUp from './pages/SignUp/SignUp';
import Home from './pages/Home/home'

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<SignUp />} />
      <Route path="/signup" element={<SignUp />} />   
      <Route path="/home" element={<Home />} />
    </Routes>
  </Router>
  );
}

export default App;

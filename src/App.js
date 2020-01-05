import './App.css';
import React from 'react'
import NavBar from './components/navbar/pcBar/pcbar'
import LoginPage from '../src/pages/login/login'
import HomePage from '../src/pages/home/home'
import { Route, BrowserRouter as Router } from 'react-router-dom'

function App() {
  return (
    <Router>
        <NavBar />
        <Route exact path='/' component={HomePage}></Route>
        <Route exact path='/login' component={LoginPage}></Route>
    </Router>
  );
}

export default App;

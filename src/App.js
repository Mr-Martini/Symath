import './App.css';
import React from 'react'
import NavBar from './components/navbar/pcbar/pcbar.jsx'
import Form from '../src/pages/form/form'
import HomePage from '../src/pages/home/home'
import About from '../src/pages/about/about'
import { Route, BrowserRouter as Router } from 'react-router-dom'

function App() {
  return (
    <Router>
        <NavBar />
        <Route exact path='/' component={HomePage}></Route>
        <Route exact path='/login' component={Form}></Route>
        <Route exact path='/register' component={Form}></Route>
        <Route exact path='/About' component={About}></Route>
    </Router>
  );
}

export default App;

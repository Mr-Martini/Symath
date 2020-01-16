import './App.css';
import React from 'react'
import NavBar from './components/navbar/pcbar/pcbar.jsx'
import Form from '../src/pages/form/form'
import HomePage from '../src/pages/home/home'
import About from '../src/pages/about/about'
import Plot from '../src/pages/Plot/Plot'
import Profile from '../src/pages/Profile/Profile'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './Redux/store'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <NavBar />
        <Route exact path='/' component={HomePage}></Route>
        <Route exact path='/login' component={Form}></Route>
        <Route exact path='/register' component={Form}></Route>
        <Route exact path='/About' component={About}></Route>
        <Route exact path='/Plot' component={Plot}></Route>
        <Route exact path='/Profile' component={Profile}></Route>
      </Router>
    </Provider>
  );
}

export default App;

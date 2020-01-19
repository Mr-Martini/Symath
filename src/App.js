import './App.css';
import React from 'react'
import NavBar from './components/navbar/DecideBar/DecideBar'
import Form from '../src/pages/form/form'
import HomePage from '../src/pages/home/home'
import About from '../src/pages/about/about'
import Plot from '../src/pages/Plot/Plot'
import Profile from '../src/pages/Profile/Profile'
import { connect } from 'react-redux'
import { Route, Switch, Redirect } from 'react-router-dom'

function App({ userCredentials }) {

  return (
    <div>
      <NavBar />
      <Switch>
        <Route exact path='/' component={HomePage}></Route>
        <Route path='/login' render={() => userCredentials.email ? <Redirect to='/' /> : <Form />}></Route>
        <Route path='/register' render={() => userCredentials.email ? <Redirect to='/' /> : <Form />}></Route>
        <Route path='/About' component={About}></Route>
        <Route path='/Plot' component={Plot}></Route>
        <Route path='/Profile' component={Profile}></Route>
      </Switch>
    </div>
  );
}

const mapState = state => ({
  userCredentials: state.UserReducer,
})

export default connect(mapState)(App);

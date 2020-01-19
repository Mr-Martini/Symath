import './App.css';
import React, { useEffect } from 'react'
import NavBar from './components/navbar/DecideBar/DecideBar'
import Form from '../src/pages/form/form'
import HomePage from '../src/pages/home/home'
import About from '../src/pages/about/about'
import Plot from '../src/pages/Plot/Plot'
import Profile from '../src/pages/Profile/Profile'
import { connect } from 'react-redux'
import { Route, Switch, Redirect } from 'react-router-dom'
import { getUserPhoto, getUserName } from './Firebase/Firebase'
import { GET_USER_NAME, UPLOAD_USER_PHOTO } from './Redux/User/UserActions'

function App({ userCredentials, pushUserNameStore, pushPhotoStore }) {

  useEffect(() => {
    console.log('loopAp?')
    getUserName().then((userName) => (
      pushUserNameStore(userName)
    )).catch(error => (
      console.log(error.message)
    ))
    getUserPhoto().then(photo => {
      pushPhotoStore(photo)
    }).catch(error => (
      console.log('Appjs photo url', error.message)
    ))

  }, [pushUserNameStore, pushPhotoStore])

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

const mapDispatch = dispatch => ({
  pushUserNameStore: (userName) => dispatch(GET_USER_NAME(userName)),
  pushPhotoStore: (photo) => dispatch(UPLOAD_USER_PHOTO(photo))
})

export default connect(mapState, mapDispatch)(App);

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
import { auth, firestore } from './Firebase/Firebase'
import { GET_USER_NAME } from './Redux/User/UserActions'


function App({ userCredentials, getUserName }) {

  useEffect(() => {
    console.log('loopAp?')
    if (userCredentials.email) {
      let unsubscribe = auth.onAuthStateChanged( async function (user) {
        await firestore.doc(`users/${user.uid}`).get()
          .then(doc => (
            getUserName(doc.data().name)
          ))
          .catch((error) => (
            console.log(error.message)
          ))
      })
      return unsubscribe()
    }
  }, [getUserName, userCredentials.email])

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
  userCredentials: state.UserReducer
})

const mapDispatch = dispatch => ({
  getUserName: (userName) => dispatch(GET_USER_NAME(userName))
})

export default connect(mapState, mapDispatch)(App);

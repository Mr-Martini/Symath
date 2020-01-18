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
import { auth, firestore, storage } from './Firebase/Firebase'
import { GET_USER_NAME, UPLOAD_USER_PHOTO } from './Redux/User/UserActions'


function App({ userCredentials, getUserName, getProfilePhoto }) {

  useEffect(() => {
    console.log('loopAp?')
    if (userCredentials.email || !userCredentials.photo) {
      let unsubscribe = auth.onAuthStateChanged(async function (user) {
        await firestore.doc(`users/${user.uid}`).get()
          .then(doc => {
            getUserName(doc.data().name)
            let storageRef = storage.ref(`users/${user.uid}`)
            let imagesRef = storageRef.child(`/images/profile/${doc.data().photoName}`)
            imagesRef.getDownloadURL()
              .then((resposta) => (
                getProfilePhoto(resposta)
              )).catch(function (erro) {
                console.log("Erro: " + erro);
              });
          })
          .catch((error) => (
            console.log(error.message)
          ))
      })
      return unsubscribe()
    }
  }, [getUserName, userCredentials.email, getProfilePhoto, userCredentials.photo])

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
  getUserName: (userName) => dispatch(GET_USER_NAME(userName)),
  getProfilePhoto: (photoName) => dispatch(UPLOAD_USER_PHOTO(photoName))
})

export default connect(mapState, mapDispatch)(App);

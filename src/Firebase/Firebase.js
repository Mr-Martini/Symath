import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

var firebaseConfig = {
  apiKey: "AIzaSyA8an12749Yyt2mBb_Jl_PgVYce7e9tp50",
  authDomain: "symath-fbf14.firebaseapp.com",
  databaseURL: "https://symath-fbf14.firebaseio.com",
  projectId: "symath-fbf14",
  storageBucket: "symath-fbf14.appspot.com",
  messagingSenderId: "556157466372",
  appId: "1:556157466372:web:385b95f25b39218d8e8251"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth()
export const firestore = firebase.firestore()
export const storage = firebase.storage()

export default firebase

export const createUserDoc = async (userCredentials) => {

  auth.createUserWithEmailAndPassword(userCredentials.email, userCredentials.password)
    .then(async function (user) {
      let userAuth = user.user
      userAuth.updateProfile({
        displayName: userCredentials.userName
      })
      let userRef = firestore.doc(`users/${userAuth.uid}`)
      const snapshot = await userRef.get()

      if (!snapshot.exists) {
        const createdAt = new Date()

        try {
          await userRef.set({
            name: userCredentials.userName,
            email: userCredentials.email,
            createdAt: createdAt,
            photoName: '',
          })
        }
        catch (error) {
          console.log(error.message)
        }

      }
    })
    .catch((error) => (
      console.log(error.message)
    ))
}

export const uploadUserImage = async (photo) => {
  if (!photo) return 
  let user = auth.currentUser
  let storageRef = storage.ref(`users/${user.uid}`)
  let imagesRef = storageRef.child(`/images/profile/${photo.name}`)
  let uploadImage = imagesRef.put(photo)
  uploadImage.resume()
  firestore.doc(`users/${user.uid}`).update({
    photoName: photo.name
  })
  const getUrl = await imagesRef.getDownloadURL()
  user.updateProfile({
    photoURL: getUrl
  }).then( result => {
  }).catch(error =>{
    console.log(error.message)
  })
}


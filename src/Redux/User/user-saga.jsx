import { auth, storage, firestore } from '../../Firebase/Firebase'
import { HANDLE_USER_SIGN_IN, HANDLE_USER_SIGN_UP } from '../User/UserTypes'
import { put, call, takeLatest, all } from 'redux-saga/effects'
import {
    SUCCESS_SIGN_IN_EMAIL,
    FAILURE_SIGN_IN_EMAIL,
    SUCCESS_SIGN_UP_EMAIL,
    FAILURE_SIGN_UP_EMAIL,
    SUCCESS_UPLOAD_PHOTO,
    FAILURE_UPLOAD_PHOTO
} from '../User/UserActions'


export function* signInWithEmail({ payload: { email, password } }) {
    try {
        const { user } = yield auth.signInWithEmailAndPassword(email, password)
        const userCredentials = { email: email, password: password, userName: user.displayName, photo: user.photoURL }
        yield put(SUCCESS_SIGN_IN_EMAIL(userCredentials))
    } catch (error) {
        yield put(FAILURE_SIGN_IN_EMAIL(error.message))
    }
}

export function* signUpWithEmail({ payload: { email, password, userName } }) {
    try {
        const { user } = yield auth.createUserWithEmailAndPassword(email, password)
        yield user.updateProfile({ displayName: userName })
        yield put(SUCCESS_SIGN_UP_EMAIL({ email: email, password: password, userName: userName }))
        const userRef = yield firestore.doc(`users/${user.uid}`)
        const createdAt = yield new Date()
        yield userRef.set({
            name: userName,
            email: email,
            createdAt: createdAt,
            photoName: '',
        })
    } catch (error) {
        yield put(FAILURE_SIGN_UP_EMAIL(error.message))
    }
}

export function* uploadPhoto(photo) {
    try {
        const user = yield auth.currentUser
        const storageRef = yield storage.ref(`users/${user.uid}`)
        const imagesRef = yield storageRef.child(`/images/profile/${photo.photo.name}`)
        yield imagesRef.put(photo.photo)
        yield firestore.doc(`users/${user.uid}`).update({
            photoName: photo.photo.name
        })
        const getUrl = yield imagesRef.getDownloadURL()
        yield user.updateProfile({ photoURL: getUrl })
        yield put(SUCCESS_UPLOAD_PHOTO(getUrl))
    } catch (error) {
        yield put(FAILURE_UPLOAD_PHOTO(error.message))
    }
}

export function* onEmailSignInStart() {
    yield takeLatest(HANDLE_USER_SIGN_IN.START_SIGN_IN_EMAIL, signInWithEmail)
}

export function* onEmailSignUpStart() {
    yield takeLatest(HANDLE_USER_SIGN_UP.START_SIGN_UP_EMAIL, signUpWithEmail)
}

export function* onStartUploadPhoto() {
    yield takeLatest(HANDLE_USER_SIGN_IN.START_UPLOAD_PHOTO, uploadPhoto)
}

export function* userSaga() {
    yield all([
        call(onEmailSignInStart),
        call(onEmailSignUpStart),
        call(onStartUploadPhoto)
    ])
}
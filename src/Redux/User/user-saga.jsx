import { auth, storage, firestore } from '../../Firebase/Firebase'
import { HANDLE_USER_SIGN_IN, HANDLE_USER_SIGN_UP } from '../User/UserTypes'
import { put, call, takeLatest, all } from 'redux-saga/effects'
import {
    SUCCESS_SIGN_IN_EMAIL,
    FAILURE_SIGN_IN_EMAIL,
    SUCCESS_SIGN_UP_EMAIL,
    FAILURE_SIGN_UP_EMAIL,
    SUCCESS_UPLOAD_PHOTO,
    FAILURE_UPLOAD_PHOTO,
    SUCCESS_USER_SIGN_OUT,
    FAILURE_USER_SIGN_OUT
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

export function* uploadPhoto(file) {
    try {
        const user = yield auth.currentUser
        const storageRef = yield storage.ref(`users/${user.uid}`)
        const firestoreRef = yield firestore.doc(`users/${user.uid}`).get()
        const firestoreData = firestoreRef.data()
        const userPhoto = firestoreData.photoName
        let getUrl = user.photoURL
        if (userPhoto !== file.photo.name) {
            const imagesRef = yield storageRef.child(`/images/profile/${file.photo.name}`)
            yield imagesRef.put(file.photo)
            const profileRef = yield storage.ref(`users/${user.uid}/images/profile`)
            const deletePreviousPhoto = yield profileRef.child(`/${userPhoto}`)
            yield deletePreviousPhoto.delete()
            yield firestore.doc(`users/${user.uid}`).update({
                photoName: file.photo.name
            })
            getUrl = yield imagesRef.getDownloadURL()
            yield user.updateProfile({ photoURL: getUrl })
        }
        yield put(SUCCESS_UPLOAD_PHOTO(getUrl))
    } catch (error) {
        yield put(FAILURE_UPLOAD_PHOTO(error.message))
    }
}

export function* signOutSaga() {
    try {
        yield auth.signOut()
        yield put(SUCCESS_USER_SIGN_OUT())
    } catch (error) {
        yield put(FAILURE_USER_SIGN_OUT())
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

export function* onStartUserSignOut() {
    yield takeLatest(HANDLE_USER_SIGN_IN.START_USER_SIGN_OUT, signOutSaga)
}

export function* userSaga() {
    yield all([
        call(onEmailSignInStart),
        call(onEmailSignUpStart),
        call(onStartUploadPhoto),
        call(onStartUserSignOut)
    ])
}
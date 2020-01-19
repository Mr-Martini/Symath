import { HANDLE_USER_SIGN_IN, HANDLE_USER_SIGN_UP } from './UserTypes'


//Sign In
export const START_SIGN_IN_EMAIL = (emailAndPassword) => {
    return {
    type: HANDLE_USER_SIGN_IN.START_SIGN_IN_EMAIL,
    payload: emailAndPassword
    }
}

export const SUCCESS_SIGN_IN_EMAIL = (userCredentials) => ({
    type: HANDLE_USER_SIGN_IN.SUCCESS_SIGN_IN_EMAIL,
    userCredentials: userCredentials
})

export const FAILURE_SIGN_IN_EMAIL = error => ({
    type: HANDLE_USER_SIGN_IN.FAILURE_SIGN_IN_EMAIL,
    error: error
})

export const USER_SIGN_OUT = () => ({
    type: HANDLE_USER_SIGN_IN.USER_SIGN_OUT
})

export const START_UPLOAD_PHOTO = (photoName) => ({
    type: HANDLE_USER_SIGN_IN.START_UPLOAD_PHOTO,
    photo: photoName
})

export const SUCCESS_UPLOAD_PHOTO = (photoURL) => ({
    type: HANDLE_USER_SIGN_IN.SUCCESS_UPLOAD_PHOTO,
    photoURL: photoURL
})

export const FAILURE_UPLOAD_PHOTO = (error) => ({
    type: HANDLE_USER_SIGN_IN.FAILURE_UPLOAD_PHOTO,
    error: error
})




//Sign Up

export const START_SIGN_UP_EMAIL = (emailAndPasswordAndName) => {
    return {
    type: HANDLE_USER_SIGN_UP.START_SIGN_UP_EMAIL,
    payload: emailAndPasswordAndName
    }
}

export const SUCCESS_SIGN_UP_EMAIL = (userCredentials) => ({
    type: HANDLE_USER_SIGN_UP.SUCCESS_SIGN_UP_EMAIL,
    userCredentials: userCredentials
})

export const FAILURE_SIGN_UP_EMAIL = error => ({
    type: HANDLE_USER_SIGN_UP.FAILURE_SIGN_UP_EMAIL,
    error: error
})

import { HANDLE_USER_SIGN_IN } from './UserTypes'

export const START_SIGN_IN_EMAIL = (email, password, username) => ({
    type: HANDLE_USER_SIGN_IN.START_SIGN_IN_EMAIL,
    email: email,
    password: password,
    username: username
})

export const SUCCESS_SIGN_IN_EMAIL = () => ({
    type: HANDLE_USER_SIGN_IN.SUCCESS_SIGN_IN_EMAIL
})

export const FAILURE_SIGN_IN_EMAIL = error => ({
    type: HANDLE_USER_SIGN_IN.FAILURE_SIGN_IN_EMAIL,
    error: error
})
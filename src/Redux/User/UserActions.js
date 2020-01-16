import { HANDLE_USER_SIGN_IN } from './UserTypes'

export const START_SIGN_IN_EMAIL = () => {
    return {
    type: HANDLE_USER_SIGN_IN.START_SIGN_IN_EMAIL,
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

export const GET_USER_NAME = (userName) => ({
    type:HANDLE_USER_SIGN_IN.GET_USER_NAME,
    userName: userName
})
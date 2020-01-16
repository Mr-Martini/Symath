import { HANDLE_USER_SIGN_IN } from './UserTypes'

const INITIAL_STATE = {
    userName: '',
    email: '',
    password: '',
    isLoading: false,
    error: ''
}

const UserReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case HANDLE_USER_SIGN_IN.START_SIGN_IN_EMAIL:
            return {
                ...state,
                isLoading: true
            }
        case HANDLE_USER_SIGN_IN.SUCCESS_SIGN_IN_EMAIL:
            return {
                ...state,
                userName: action.userCredentials.userName,
                email: action.userCredentials.email,
                password: action.userCredentials.password,
                isLoading: false,
            }
        case HANDLE_USER_SIGN_IN.FAILURE_SIGN_IN_EMAIL:
            return {
                ...state,
                isLoading: false,
                error: action.error
            }
        case HANDLE_USER_SIGN_IN.USER_SIGN_OUT:
            return {
                ...state,
                userName: '',
                email: '',
                password: '',
                isLoading: false
            }
        case HANDLE_USER_SIGN_IN.GET_USER_NAME:
            console.log(action.userName)
            return {
                ...state,
                userName: action.userName
            }
        default:
            return state
    }
}

export default UserReducer


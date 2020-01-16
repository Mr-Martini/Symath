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
                userName: action.userName,
                email: action.email,
                password: action.password,
                isLoading: false,
            }
        case HANDLE_USER_SIGN_IN.FAILURE_SIGN_IN_EMAIL:
            return {
                ...state,
                isLoading: false,
                error: action.error
            }
        default:
            return {...state}
    }
}

export default UserReducer


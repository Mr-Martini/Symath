import { HANDLE_USER_SIGN_IN } from './UserTypes'

const INITIAL_STATE = {
    userName: '',
    email: '',
    password: '',
    isLoading: false,
    error: '',
    photo: null
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
                isLoading: false,
                photo: null
            }
        case HANDLE_USER_SIGN_IN.GET_USER_NAME:
            return {
                ...state,
                userName: action.userName
            }
        case HANDLE_USER_SIGN_IN.UPLOAD_USER_PHOTO:
            return {
                ...state,
                photo: action.photo
            }
        default:
            return state
    }
}

export default UserReducer


import { HANDLE_USER_SIGN_IN, HANDLE_USER_SIGN_UP } from './UserTypes'

const INITIAL_STATE = {
    userName: '',
    email: '',
    password: '',
    isLoading: false,
    error: '',
    photo: null,
    isLoadingPhoto: false
}

const UserReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case HANDLE_USER_SIGN_IN.START_SIGN_IN_EMAIL:
            return {
                ...state,
                isLoading: true,
                error: '',
            }
        case HANDLE_USER_SIGN_IN.SUCCESS_SIGN_IN_EMAIL:
            return {
                ...state,
                userName: action.userCredentials.userName,
                email: action.userCredentials.email,
                password: action.userCredentials.password,
                isLoading: false,
                photo: action.userCredentials.photo,
                error: '',
            }
        case HANDLE_USER_SIGN_IN.FAILURE_SIGN_IN_EMAIL:
            return {
                ...state,
                isLoading: false,
                error: action.error
            }

        case HANDLE_USER_SIGN_UP.START_SIGN_UP_EMAIL:
            return {
                ...state,
                isLoading: true,
                error: '',
            }
        case HANDLE_USER_SIGN_UP.SUCCESS_SIGN_UP_EMAIL:
            return {
                ...state,
                userName: action.userCredentials.userName,
                email: action.userCredentials.email,
                password: action.userCredentials.password,
                isLoading: false,
                error: '',
            }
        case HANDLE_USER_SIGN_UP.FAILURE_SIGN_UP_EMAIL:
            return {
                ...state,
                isLoading: false,
                error: action.error
            }
        // here
        case HANDLE_USER_SIGN_IN.START_UPLOAD_PHOTO:
            return {
                ...state,
                isLoadingPhoto: true,
                error: '',
            }
        case HANDLE_USER_SIGN_IN.SUCCESS_UPLOAD_PHOTO:
            return {
                ...state,
                photo: action.photoURL,
                isLoadingPhoto: false,
                error: ''
            }
        case HANDLE_USER_SIGN_IN.FAILURE_UPLOAD_PHOTO:
            return {
                ...state,
                isLoadingPhoto: false,
                error: action.error
            }

        //Handle Sign Out
        case HANDLE_USER_SIGN_IN.START_USER_SIGN_OUT:
            return {
                ...state,
                isLoading: true,
                error: '',
            }
        case HANDLE_USER_SIGN_IN.SUCCESS_USER_SIGN_OUT:
            return {
                ...state,
                userName: '',
                email: '',
                password: '',
                isLoading: false,
                error: '',
                photo: '',
                isLoadingPhoto: false
            }
        case HANDLE_USER_SIGN_IN.FAILURE_USER_SIGN_OUT:
            return {
                ...state,
                isLoading: false,
                error: action.error
            }
        default:
            return state
    }
}

export default UserReducer


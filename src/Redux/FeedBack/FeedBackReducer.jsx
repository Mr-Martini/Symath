import HANDLE_FEEDBACK from './FeedBackTypes'

const INITIAL_STATE = {
    open: false
}

const FeedReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case HANDLE_FEEDBACK.SET_FEED_TRUE:
            return {
                ...state,
                open: action.payload
            }
        case HANDLE_FEEDBACK.SET_FEED_FALSE:
            return {
                ...state,
                open: action.payload
            }
        default:
            return state
    }
}

export default FeedReducer
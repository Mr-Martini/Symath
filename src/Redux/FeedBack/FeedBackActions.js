import HANDLE_FEEDBACK from './FeedBackTypes'

export const setFeedTrue = payload => ({
    type: HANDLE_FEEDBACK.SET_FEED_TRUE,
    payload: payload
})

export const setFeedFalse = payload => ({
    type: HANDLE_FEEDBACK.SET_FEED_FALSE,
    payload: payload
})
import HANDLE_DATA from './DataType'

export const startUploadData = data => ({
    type: HANDLE_DATA.START_UPLOAD_DATA,
    payload: data
})

export const successUploadData = success => ({
    type: HANDLE_DATA.SUCCESS_UPLOAD_DATA,
    payload: success
})

export const failureUploadData = error => ({
    type: HANDLE_DATA.FAILURE_UPLOAD_DATA,
    payload: error
})
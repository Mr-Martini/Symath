import HANDLE_DATA from './DataType'

const INITIAL_STATE = {
    graphs: undefined,
    isLoading: false,
    isLoadingPdf: false,
    success: '',
    error: '',
}

const DataReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case HANDLE_DATA.START_UPLOAD_DATA:
            return {
                ...state,
                isLoading: true,
                error: '',
                success: '',
            }
        case HANDLE_DATA.SUCCESS_UPLOAD_DATA:
            return {
                ...state,
                isLoading: false,
                success: action.payload,
                error: '',
            }
        case HANDLE_DATA.FAILURE_UPLOAD_DATA:
            return {
                ...state,
                isLoading: false,
                success: '',
                error: action.payload
            }
        case HANDLE_DATA.START_DOWNLOAD_DATA:
            return {
                ...state,
                isLoadingPdf: true
            }
        case HANDLE_DATA.SUCCESS_DOWNLOAD_DATA:
            return {
                ...state,
                isLoadingPdf: false,
                graphs: action.payload
            }
        case HANDLE_DATA.FAILURE_DOWNLOAD_DATA:
            return {
                ...state,
                isLoadingPdf: false,
                error: action.payload
            }
        default: 
            return {
                ...state
            }            
    }
}
export default DataReducer
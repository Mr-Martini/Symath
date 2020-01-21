import HANDLE_DATA from './DataType'

const INITIAL_STATE = {
    graphs: null,
    isLoading: false,
    success: '',
    error: ''
}

const DataReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case HANDLE_DATA.START_UPLOAD_DATA:
            return {
                ...state,
                isLoading: true
            }
        case HANDLE_DATA.SUCCESS_UPLOAD_DATA:
            return {
                ...state,
                isLoading: false,
                success: action.payload
            }
        case HANDLE_DATA.FAILURE_UPLOAD_DATA:
            return {
                ...state,
                isLoading: false,
                success: '',
                error: action.payload
            }
        default: 
            return {
                ...state
            }            
    }
}
export default DataReducer
import HANDLE_SWITCH from './SwitchActionTypes'

const INITIAL_STATE = {
    A: true,
    B: false,
    C: false,
    D: false,
    E: false,
}

const switchReducer = (state = INITIAL_STATE, action) => {
    console.log(action.type)
    switch (action.type) {
        case HANDLE_SWITCH.TOGGLE_SWITCH:
            return {
                ...state, 
                [action.name]: action.event.checked
                }
        default: 
            return {...state}
    }
}

export default switchReducer
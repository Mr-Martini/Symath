import HANDLE_SWITCH from './SwitchActionTypes'

export const toggleSwitchButton = (name, e) => {
    return {
    type: HANDLE_SWITCH.TOGGLE_SWITCH,
    event: e.target,
    name: name
    }
}
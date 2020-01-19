import HANDLE_SWITCH from './SwitchActionTypes'

export const sagaSwitch = () => ({
    type: HANDLE_SWITCH.TOGGLE_SWITCH
})

export const toggleSwitchButton = (name, e) => {
    return {
    type: HANDLE_SWITCH.SET_SWITCH,
    event: e.target,
    name: name
    }
}
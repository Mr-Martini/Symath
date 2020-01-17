import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import { toggleSwitchButton } from '../../Redux/Switch/SwitchActions'

const useStyles = makeStyles(theme => ({
    root: {
        color: 'white',
    },
}));

function SwitchLabels({ switchState,  toggleSwitch }) {

    const classes = useStyles()

    return (
        <FormGroup>
            <FormControlLabel
                control={
                    <Switch checked={switchState.A} onChange={toggleSwitch('A')} value="A" />
                }
                label="Data Plot"
                classes={{
                    root: classes.root
                }}
            />
            <FormControlLabel
                control={
                    <Switch
                        checked={switchState.B}
                        onChange={toggleSwitch('B')}
                        value="B"
                        color="secondary"
                    />
                }
                classes={{
                    root: classes.root
                }}
                label="Linear Regression"
            />
        </FormGroup>
    );
}

const mapDispatch = dispatch => {
    return {
        toggleSwitch: name => event => dispatch(toggleSwitchButton(name, event))
    }
}

const mapState = (state) => {
    const switchState = state.SwitchReducer
    return {switchState}
}

export default connect(mapState, mapDispatch)(SwitchLabels)
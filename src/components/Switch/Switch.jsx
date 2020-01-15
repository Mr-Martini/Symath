import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        color: 'white',
    },
}));

export default function SwitchLabels({ state, handleChange }) {

    const classes = useStyles()

    return (
        <FormGroup>
            <FormControlLabel
                control={
                    <Switch checked={state.A} onChange={handleChange('A')} value="A" />
                }
                label="Data Plot"
                classes={{
                    root: classes.root
                }}
            />
            <FormControlLabel
                control={
                    <Switch
                        checked={state.B}
                        onChange={handleChange('B')}
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
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {TextField} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        marginBottom: theme.spacing(1),
        width: "60%",
        borderRadius: '0.4em',
    },
    input: {
      color: 'white'
    }
}));


export default function ({pegarInput}) {

    const classes = useStyles()

    return (
        <TextField
            InputProps={{
                className: classes.input
            }}
            InputLabelProps={{
                className: classes.input
            }}
            id="standard-search"
            label="Data"
            type="search"
            className={classes.textField}
            margin="normal"
            placeholder="Split the numbers by ; e.g(4;4.69;7.77;5)"
            onChange={pegarInput}
            color='secondary'
        />
    )

}
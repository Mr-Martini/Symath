import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {TextField} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        marginBottom: theme.spacing(1),
        width: "60%",
        backgroundColor: '#808080',
        borderRadius: '0.4em',
    },

}));


export default function ({pegarInput}) {

    const classes = useStyles()

    return (
        <TextField
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
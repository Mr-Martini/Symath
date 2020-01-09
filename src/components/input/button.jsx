import React from 'react'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    button: {
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(2),
    }
}))

export default function ({ color, variant, children, onClick, size}) {

    const classes = useStyles()

    return (
        <Button className={classes.button} size={size} onClick={onClick} color={color} variant={variant}>{children}</Button>
    )
}
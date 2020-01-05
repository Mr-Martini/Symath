import React from 'react'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({

}))

export default function ({ color, variant, children }) {

    const classes = useStyles()

    return (
        <Button className={classes.button} color={color} variant={variant}>{children}</Button>
    )
}
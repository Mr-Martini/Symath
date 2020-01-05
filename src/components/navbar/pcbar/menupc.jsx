import React from 'react'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    divPc: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex'
        }
    }
}))

export default function () {

    const classes = useStyles()

    return (
        <div className={classes.divPc}>
            <Button color="inherit">Login</Button>
            <Button color="inherit">Register</Button>
        </div>
    )
} 
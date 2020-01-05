import React from 'react'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'

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
            <Button component={Link} to='/login' color="inherit">Login</Button>
            <Button component={Link} to='/register' color="inherit">Register</Button>
        </div>
    )
} 
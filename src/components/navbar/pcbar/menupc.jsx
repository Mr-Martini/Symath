import React from 'react'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const useStyles = makeStyles(theme => ({
    divPc: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        }
    }
}))

function MenuPc({ userCredentials }) {

    const classes = useStyles()

    return (
        <div className={classes.divPc}>
            {userCredentials.email ?
                <>
                    <Button component={Link} to='#' color="inherit">Logout</Button>
                    <Button component={Link} to='#' color="inherit">Donate</Button>
                </>
                :
                <>
                    <Button component={Link} to='/login' color="inherit">Login</Button>
                    <Button component={Link} to='/register' color="inherit">Register</Button>
                </>
            }
        </div>
    )
}

const mapState = state => ({
    userCredentials: state.UserReducer
})

export default connect(mapState)(MenuPc)
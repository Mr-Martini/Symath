import React from 'react'
import MoreIcon from '@material-ui/icons/MoreVert'
import { makeStyles } from '@material-ui/core/styles'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { USER_SIGN_OUT } from '../../../Redux/User/UserActions'

const useStyles = makeStyles(theme => ({
    divMob: {
        display: 'none',
        cursor: 'pointer',
        [theme.breakpoints.down('md')]: {
            display: 'flex',
        }
    },
    menu: {
        backgroundColor: '#4d4d4d',
        color: 'white'
    },
}))

function MenuMob({ userCredentials, SignOut }) {
    const classes = useStyles()

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const onClick = event => {
        handleClose()
        SignOut()
    }

    return (
        <div className={classes.divMob}>
            <MoreIcon onClick={handleClick} />
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                PaperProps={{
                    className: classes.menu
                }}
            >   {userCredentials.email ?
                <div>
                    <MenuItem component={Link} to='#' onClick={onClick}>Logout</MenuItem>
                    <MenuItem component={Link} to='#' onClick={handleClose}>Donate</MenuItem>
                </div>
                :
                <div>
                    <MenuItem component={Link} to='/login' onClick={handleClose}>Login</MenuItem>
                    <MenuItem component={Link} to='/register' onClick={handleClose}>Register</MenuItem>
                </div>
                }
            </Menu>
        </div>
    )
}

const mapState = state => ({
    userCredentials: state.UserReducer
})

const mapDispatch = dispatch => ({
    SignOut: () => dispatch(USER_SIGN_OUT())
})

export default connect(mapState, mapDispatch)(MenuMob)
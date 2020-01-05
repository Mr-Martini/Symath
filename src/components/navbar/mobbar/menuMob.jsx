import React from 'react'
import MoreIcon from '@material-ui/icons/MoreVert'
import { makeStyles } from '@material-ui/core/styles'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem'
import { Link } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
    divMob: {
        display: 'none',
        cursor: 'pointer',
        [theme.breakpoints.down('md')]: {
            display: 'flex'
        }
    }
}))

export default function () {
    const classes = useStyles()

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className={classes.divMob}>
            <MoreIcon onClick={handleClick} />
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem component={Link} to='/login' onClick={handleClose}>Login</MenuItem>
                <MenuItem component={Link} to='/register' onClick={handleClose}>Register</MenuItem>
            </Menu>
        </div>
    )
}
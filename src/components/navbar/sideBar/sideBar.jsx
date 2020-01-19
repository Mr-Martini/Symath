import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { IconButton } from '@material-ui/core'
import Drawer from '@material-ui/core/Drawer'
import MenuIcon from '@material-ui/icons/Menu'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import InfoIcon from '@material-ui/icons/Info'
import GraphIcon from '@material-ui/icons/InsertChart'
import ProfileIcon from '@material-ui/icons/People'
import LoginIcon from '@material-ui/icons/Person'
import RegisterIcon from '@material-ui/icons/Add'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { USER_SIGN_OUT } from '../../../Redux/User/UserActions'

const useStyles = makeStyles(theme => ({
    list: {
        width: 250,
        backgroundColor: '#202124',
        color: 'white'
    },
    fullList: {
        width: 'auto',
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    root: {
        backgroundColor: '#4d4d4d'
    },
    drawer: {
        background: '#202124'
    }
}));

function TemporaryDrawer({ mobile, userCredentials, SignOut }) {
    const classes = useStyles()

    const [state, setState] = React.useState({
        left: false,
    });

    const toggleDrawer = (side, open) => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [side]: open });
    };

    const sideList = side => (
        <div
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer(side, false)}
            onKeyDown={toggleDrawer(side, false)}
        >
            {!mobile ?
                <List>
                    <ListItem button component={Link} to={'/About'} >
                        <ListItemIcon>
                            <InfoIcon color='secondary' />
                        </ListItemIcon>
                        <ListItemText primary='About' />
                    </ListItem>

                    <ListItem button component={Link} to={'/Plot'} >
                        <ListItemIcon>
                            <GraphIcon color='secondary' />
                        </ListItemIcon>
                        <ListItemText primary='Plot' />
                    </ListItem>
                    <ListItem button component={Link} to={'/Profile'} >
                        <ListItemIcon>
                            <ProfileIcon color='secondary' />
                        </ListItemIcon>
                        <ListItemText primary='Profile' />
                    </ListItem>
                </List>
                :
                <List>
                    <ListItem button component={Link} to={'/About'} >
                        <ListItemIcon>
                            <InfoIcon color='secondary' />
                        </ListItemIcon>
                        <ListItemText primary='About' />
                    </ListItem>

                    {!userCredentials.email ?
                        <ListItem button component={Link} to={'/register'} >
                            <ListItemIcon>
                                <RegisterIcon color='secondary' />
                            </ListItemIcon>
                            <ListItemText primary='Register' />
                        </ListItem>
                        :
                        null
                    }
                    {!userCredentials.email ?
                        <ListItem button component={Link} to={'/login'} >
                            <ListItemIcon>
                                <LoginIcon color='secondary' />
                            </ListItemIcon>
                            <ListItemText primary='Login' />
                        </ListItem>
                        :
                        <ListItem button onClick={SignOut} >
                            <ListItemIcon>
                                <LoginIcon color='secondary' />
                            </ListItemIcon>
                            <ListItemText primary='Logout' />
                        </ListItem>
                    }
                </List>
            }
        </div>
    );

    return (
        <div>
            {!mobile ?
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={toggleDrawer('left', true)}>
                    <MenuIcon />
                </IconButton>
                : <div onClick={toggleDrawer('left', true)}>
                    <MenuIcon color='secondary' />
                </div>
            }
            <Drawer
                elevation={16}
                open={state.left}
                onClose={toggleDrawer('left', false)}
                PaperProps={{
                    className: classes.drawer
                }}
            >
                {sideList('left')}
            </Drawer>
        </div>
    )
}

const mapState = state => ({
    userCredentials: state.UserReducer
})

const mapDispatch = dispatch => ({
    SignOut: () => dispatch(USER_SIGN_OUT())
})

export default connect(mapState, mapDispatch)(TemporaryDrawer)
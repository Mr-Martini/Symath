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
import { Link } from 'react-router-dom'

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

export default function TemporaryDrawer() {
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
            <List>
                {['About', 'Plot', 'Profile'].map((text, index) => (
                    <ListItem key={index} button component={Link} to={`/${text}`} >
                        {index === 0 ?
                            <ListItemIcon>
                                <InfoIcon color='secondary' />
                            </ListItemIcon> : null
                        }
                        {index === 1 ?
                            <ListItemIcon>
                                <GraphIcon color='secondary' />
                            </ListItemIcon> : null
                        }
                        {index === 2 ?
                            <ListItemIcon>
                                <ProfileIcon color='secondary' />
                            </ListItemIcon> : null
                        }
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </div>
    );

    return (
        <div>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={toggleDrawer('left', true)}>
                <MenuIcon />
            </IconButton>
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
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

const useStyles = makeStyles(theme => ({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    root: {
        backgroundColor: '#424141'
    },
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
                <ListItem button >
                    <ListItemIcon>
                        <InfoIcon />
                    </ListItemIcon>
                    <ListItemText primary='About' />
                </ListItem>
            </List>
        </div>
    );

    return (
        <div>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={toggleDrawer('left', true)}>
                <MenuIcon />
            </IconButton>
            <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
                {sideList('left')}
            </Drawer>
        </div>
    )
}
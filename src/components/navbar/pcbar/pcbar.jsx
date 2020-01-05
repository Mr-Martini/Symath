import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import MenuPC from '../pcBar/menupc'
import MenuMobile from '../mobbar/menuMob'
import SideDrawer from '../sideBar/sideBar'
import { Link } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        cursor: 'pointer'
    },
    link: {
        textDecoration: 'none',
        color: 'inherit',
    },
}));

export default function ButtonAppBar() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static" elevation={6} color='secondary'>
                <Toolbar>
                    <SideDrawer />
                    <Typography variant="h6" className={classes.title}>
                        <Link to='/' className={classes.link}>
                            Symath
                        </Link>
                    </Typography>
                    <MenuPC />
                    <MenuMobile />
                </Toolbar>
            </AppBar>
        </div>
    );
}
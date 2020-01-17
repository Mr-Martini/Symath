import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import PlotIcon from '@material-ui/icons/GraphicEq';
import ProfileIcon from '@material-ui/icons/People';
import MenuButton from '../sideBar/sideBar'
import { Link } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    backgroundColor: '#4d4d4d',
    zIndex: 500
  },
  label: {
    color: 'white'
  },
  selected: {
    color: '#F50057'
  }
}));

function SimpleBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction classes={{ label: classes.label, selected: classes.selected }} component={Link} to='/' label="Home" icon={<HomeIcon color='secondary' />} />
      <BottomNavigationAction classes={{ label: classes.label, selected: classes.selected }} component={Link} to='/Plot' label="Plot" icon={<PlotIcon color='secondary' />} />
      <BottomNavigationAction classes={{ label: classes.label, selected: classes.selected }} component={Link} to='/Profile' label="Profile" icon={<ProfileIcon color='secondary' />} />
      <BottomNavigationAction classes={{ label: classes.label, selected: classes.selected }} label="Menu" icon={<MenuButton mobile={true} />} />
    </BottomNavigation>
  );
}
export default (SimpleBottomNavigation)
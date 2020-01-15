import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '../../input/button'
import { Typography } from '@material-ui/core'
import List from '@material-ui/core/List';
import InputField from '../../input/InputFied'
import Switch from '../../Switch/Switch'

const useStyles = makeStyles(theme => ({
    list: {
        display: 'flex',
        justifyContent: 'flex-start',
        padding: '1em',
    },
    fullList: {
        width: 'auto',
    },
    drawer: {
        background: '#202124'
    },
    absolute: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(3),
    },
    inputs: {
        width: '45%',
    },
    switchs: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
}));

export default function TemporaryDrawer({ pegarInputX, pegarInputY, takeLineColor, takeCircleColor }) {
    const classes = useStyles();
    const [state, setState] = React.useState({
        bottom: false,
    });

    const toggleDrawer = (side, open) => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Esc')) {
            return;
        }

        setState({ ...state, [side]: open });
    };

    const fullList = side => (
        <div
            className={classes.fullList}
            role="presentation"
        >
            <List className={classes.list}>
                <div className={classes.inputs}>
                    <Typography color='secondary' variant='h6'>Customization</Typography>
                    <InputField
                        pegarInput={pegarInputX}
                        id='standard-search'
                        label='X Axis'
                        type='search'
                        margin='normal'
                        placeholder="X axis's name"
                        icone='graph'
                    />
                    <InputField
                        pegarInput={pegarInputY}
                        id='standard-search'
                        label='Y Axis'
                        type='search'
                        margin='normal'
                        placeholder="Y axis's name"
                        icone='graph'
                    />
                    <InputField
                        pegarInput={takeLineColor}
                        id='standard-search'
                        label='Line Color'
                        type='search'
                        margin='normal'
                        placeholder="Insert the line color"
                        icone='graph'
                    />
                    <InputField
                        pegarInput={takeCircleColor}
                        id='standard-search'
                        label='Circle Color'
                        type='search'
                        margin='normal'
                        placeholder="Insert the circle color"
                        icone='graph'
                    />
                </div>
                <div className={classes.switchs}>
                    <Switch/>
                </div>
            </List>
        </div>
    );

    return (
        <div>
            <Button color='secondary' variant='contained' onClick={toggleDrawer('bottom', true)}>Show Options</Button>
            <Drawer
                anchor="bottom"
                open={state.bottom}
                onClose={toggleDrawer('bottom', false)}
                PaperProps={{
                    className: classes.drawer
                }}>
                {fullList('bottom')}
            </Drawer>
        </div>
    );
}
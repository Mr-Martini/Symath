import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '../../input/button'
import List from '@material-ui/core/List';
import InputField from '../../input/InputFied'
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';

const useStyles = makeStyles(theme => ({
    list: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center'

    },
    fullList: {
        width: 'auto',
    },
    drawer: {
        background: '#202124'
    },
    fab: {
        margin: theme.spacing(2),
    },
}));

export default function TemporaryDrawer({ pegarInputX, pegarInputY, setOptions, takeLineColor, takeCircleColor }) {
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
                <div>
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
                <Tooltip onClick={setOptions} title="Add" aria-label="add">
                    <Fab color="secondary" className={classes.fab}>
                        <AddIcon />
                    </Fab>
                </Tooltip>
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
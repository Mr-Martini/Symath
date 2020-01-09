import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '../../input/button'
import List from '@material-ui/core/List';
import InputField from '../../input/InputFied'

const useStyles = makeStyles({
    list: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

    },
    fullList: {
        width: 'auto',
    },
    drawer: {
        background: '#202124'
    }
});

export default function TemporaryDrawer({ pegarInputX, pegarInputY, setOptions }) {
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
                </div>
                <Button color='secondary' onClick={setOptions} variant='contained'>OK</Button>
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
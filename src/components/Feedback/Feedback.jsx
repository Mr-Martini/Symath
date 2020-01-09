import React, { useState } from 'react';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom'


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
    root: {
        width: '10%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
        position: 'fixed',
        left: '1em',
        bottom: '1em',
        cursor: 'pointer',
    },
}));

const CustomizedSnackbars = ({ match }) => {
    const classes = useStyles();

    const [isAlertNotClosed, setIsAlertNotClosed] = useState(true)

    const handleClose = () => {
        setIsAlertNotClosed(false)
    }

    return (
        <>
            {isAlertNotClosed ?
                <div onClick={handleClose} className={classes.root}>
                    <Alert color="info">You are at '{match.url.split('/').join('')}'</Alert>
                </div>
                : null
            }
        </>
    );
}

export default withRouter(CustomizedSnackbars)
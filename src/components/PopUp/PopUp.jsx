import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Avatar } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Slide from '@material-ui/core/Slide';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import InputField from '../input/InputFied'
import { connect } from 'react-redux'
import { uploadUserImage } from '../../Firebase/Firebase'

function PaperComponent(props) {
    return (
        <Draggable cancel={'[class*="MuiDialogContent-root"]'}>
            <Paper {...props} />
        </Draggable>
    );
}

const useStyles = makeStyles(theme => ({
    large: {
        width: theme.spacing(10),
        height: theme.spacing(10),
        marginBottom: theme.spacing(2),
        cursor: 'pointer'
    },
    root: {
        backgroundColor: '#4d4d4d',
        color: 'white'
    }
}))



const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function AlertDialog({ userCredentials }) {
    const [open, setOpen] = React.useState(false);
    const [userPhoto, setUserPhoto] = React.useState()

    const classes = useStyles()

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        uploadUserImage(userPhoto)
    };

    return (
        <div>
            <Avatar onClick={handleClickOpen} className={classes.large} src={userCredentials.photo ? userCredentials.photo : '#'}></Avatar>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                keepMounted
                TransitionComponent={Transition}
                PaperComponent={PaperComponent}
                style={{ cursor: 'move' }}
            >
                <DialogTitle classes={{ root: classes.root }} id="alert-dialog-title">{"Upload a profile photo"}</DialogTitle>
                <DialogContent classes={{ root: classes.root }}>
                    <InputField pegarInput={e => setUserPhoto(e.target.files[0])} type='file' placeholder='!' id='file' />
                </DialogContent>
                <DialogActions style={{ display: 'flex', justifyContent: 'center' }} disableSpacing={true} classes={{ root: classes.root }}>
                    <Button onClick={handleClose} color="secondary" autoFocus>
                        Upload
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default connect()(AlertDialog)
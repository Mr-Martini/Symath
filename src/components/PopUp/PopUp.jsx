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
import InputProfilePhoto from '../input/FileInput'
import { connect } from 'react-redux'
import { START_UPLOAD_PHOTO } from '../../Redux/User/UserActions'
import Progress from '../Feedback/Progress'

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
        color: 'white',
        textAlign: 'center'
    }
}))



const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function AlertDialog({ userCredentials, uploadPhoto, isLoading }) {
    const [open, setOpen] = React.useState(false);
    const [userPhoto, setUserPhoto] = React.useState()

    const classes = useStyles()

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleDialogClose = () => {
        setOpen(false);

    };

    const uploadButton = () => {
        uploadPhoto(userPhoto)
        setOpen(false)
    }

    return (
        <div>
            {isLoading ? <Progress /> : <Avatar onClick={handleClickOpen} className={classes.large} src={userCredentials.photo ? userCredentials.photo : '#'}></Avatar>}
            <Dialog
                open={open}
                onClose={handleDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                keepMounted
                TransitionComponent={Transition}
                PaperComponent={PaperComponent}
                style={{ cursor: 'move' }}
            >
                <DialogTitle classes={{ root: classes.root }} id="alert-dialog-title">{"Upload a profile photo (<4MB)"}</DialogTitle>
                <DialogContent classes={{ root: classes.root }}>
                    <InputProfilePhoto id='contained-button-file-pop' accept='image/*' onChange={e => setUserPhoto(e.target.files[0])}>Choose a profile photo</InputProfilePhoto>
                </DialogContent>
                <DialogActions style={{ display: 'flex', justifyContent: 'center' }} disableSpacing={true} classes={{ root: classes.root }}>
                    <Button onClick={() => uploadButton()} color="inherit" autoFocus>
                        Upload
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

const mapDispatch = dispatch => ({
    uploadPhoto: (photoName) => dispatch(START_UPLOAD_PHOTO(photoName)),
})

const mapState = state => ({
    isLoading: state.UserReducer.isLoadingPhoto,
})

export default connect(mapState, mapDispatch)(AlertDialog)
import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux' 
import { setFeedFalse } from '../../Redux/FeedBack/FeedBackActions'

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const CustomizedSnackbars = ({ error, open, setFeedFalse, severity, duration }) => {
  const classes = useStyles();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return

    setFeedFalse(false)
  }

  return (
    <div className={classes.root}>
      <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left'}} open={open} autoHideDuration={duration ? duration : 4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity ? severity : 'error'}>
          {error}
        </Alert>
      </Snackbar>
    </div>
  );
}

const mapDispatch = dispatch => ({
  setFeedFalse: (state) => dispatch(setFeedFalse(state))
})

export default connect(null, mapDispatch)(CustomizedSnackbars)
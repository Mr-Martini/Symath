import React from 'react'
import {
    Container,
    Paper,
    Typography,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import PopUpAvatar from '../../components/PopUp/PopUp'
import { startUploadData } from '../../Redux/Data/DataAction'
import FileInput from '../../components/input/FileInput'
import FeedBack from '../../components/Feedback/Feedback'
import { setFeedTrue } from '../../Redux/FeedBack/FeedBackActions'


const useStyles = makeStyles(theme => ({
    paper: {
        backgroundColor: '#4d4d4d',
        color: 'white',
        marginTop: '2em',
        padding: '1em',
        display: 'flex',
        flexDirection: 'column',
        alignItems: "center",
        marginBottom: theme.spacing(5)
    },
    large: {
        width: theme.spacing(10),
        height: theme.spacing(10),
        marginBottom: theme.spacing(2),
        cursor: 'pointer'
    },
    text: {
        marginBottom: theme.spacing(3),
    }
}))

const Profile = ({ userCredentials, uploadData, setFeedTrue, data, open }) => {

    const classes = useStyles()

    const handleUpload = e => {
        uploadData(e.target.files[0])
        setFeedTrue(true)
    }

    return userCredentials.email ? (
        <Container maxWidth='lg'>
            <Paper className={classes.paper}>
                <PopUpAvatar userCredentials={userCredentials} />
                <Typography className={classes.text} variant='h4' color='inherit'>{userCredentials.userName ? userCredentials.userName : 'Profile'}</Typography>
                <FileInput
                    accept='.pdf'
                    onChange={(e) => handleUpload(e)}
                    id='contained-button-file-profile'
                >
                    Upload PDF
                </FileInput>
                {data.error ?
                    <FeedBack open={open} error={ data.error ? data.error : null} />
                    : null
                }
                {data.success ?
                    <FeedBack duration={2000} open={open} error={data.success} severity='success' />
                    : null}
            </Paper>
        </Container>
    ) : (
            <Container maxWidth='xl'>
                <Paper className={classes.paper}>
                    <Typography variant='h2' color='secondary'>You must be logged in to see your data</Typography>
                </Paper>
            </Container>
        )
}

const mapState = state => ({
    userCredentials: state.UserReducer,
    open: state.FeedReducer.open,
    data: state.DataReducer
})

const mapDispatch = dispatch => ({
    uploadData: (file) => dispatch(startUploadData(file)),
    setFeedTrue: (state) => dispatch(setFeedTrue(state))
})

export default connect(mapState, mapDispatch)(Profile)
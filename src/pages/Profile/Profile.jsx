import React from 'react'
import {
    Container,
    Paper,
    Typography,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import InfoCard from '../../components/infoCard/infoCard'
import { connect } from 'react-redux'
import PopUpAvatar from '../../components/PopUp/PopUp'
import { getUserName, getUserPhoto } from '../../Firebase/Firebase'
import { GET_USER_NAME, UPLOAD_USER_PHOTO } from '../../Redux/User/UserActions'

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
}))

const Profile = ({ userCredentials, pushPhotoStore, pushUserNameStore }) => {

    const classes = useStyles()

    if ((!userCredentials.userName) && userCredentials.email) {
        getUserName().then(name => {
            pushUserNameStore(name)
        }).catch(error => {
            console.log(error.message)
        })
        getUserPhoto().then(photo => {
            pushPhotoStore(photo)
        }).catch(error => {
            console.log(error.message)
        })
    }

    return (
        <Container maxWidth='lg'>
            <Paper className={classes.paper}>
                <PopUpAvatar userCredentials={userCredentials} />
                <Typography variant='h4' color='secondary'>{userCredentials.userName ? userCredentials.userName : 'Profile'}</Typography>
                <InfoCard type='gráfico' icon='showMore' />
            </Paper>
        </Container>
    )
}

const mapState = state => ({
    userCredentials: state.UserReducer
})

const mapDispatch = dispatch => ({
    pushUserNameStore: (userName) => dispatch(GET_USER_NAME(userName)),
    pushPhotoStore: (photo) => dispatch(UPLOAD_USER_PHOTO(photo))
  })

export default connect(mapState, mapDispatch)(Profile)
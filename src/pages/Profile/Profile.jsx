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

const Profile = ({ userCredentials }) => {

    const classes = useStyles()

    return userCredentials.email ? (
        <Container maxWidth='lg'>
            <Paper className={classes.paper}>
                <PopUpAvatar userCredentials={userCredentials} />
                <Typography variant='h4' color='secondary'>{userCredentials.userName ? userCredentials.userName : 'Profile'}</Typography>
                <InfoCard type='Upload your graph' icon='upload' />
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
    userCredentials: state.UserReducer
})

export default connect(mapState)(Profile)
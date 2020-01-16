import React from 'react'
import {
    Container,
    Paper,
    Typography,
    Avatar
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import InfoCard from '../../components/infoCard/infoCard'

const useStyles = makeStyles(theme => ({
    paper: {
        backgroundColor: '#4d4d4d',
        color: 'white',
        marginTop: '2em',
        padding: '1em',
        display: 'flex',
        flexDirection: 'column',
        alignItems: "center",
    },
    large: {
        width: theme.spacing(10),
        height: theme.spacing(10),
        marginBottom: theme.spacing(2)
    },
}))

const Profile = () => {

    const classes = useStyles()

    return (
        <Container maxWidth='lg'>
            <Paper className={classes.paper}>
                <Avatar className={classes.large} src='#'></Avatar>
                <Typography variant='h4' color='secondary'>Profile</Typography>
                <InfoCard type='gráfico' icon='showMore'/>
            </Paper>
        </Container>
    )
}

export default Profile
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Container, Avatar, Typography } from '@material-ui/core'
import React from 'react'
import SnackBar from '../../components/Feedback/Feedback'

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
      },
      text: {
          margin: theme.spacing(2),
      },
}))

export default function () {

    const classes = useStyles()

    return (
        <Container>
            <Paper className={classes.paper} elevation={12}>
                <Avatar className={classes.large} alt='Marcos Martini' src='https://i.ytimg.com/vi/E6CYI3Xb1tQ/maxresdefault.jpg'></Avatar>
                <Typography variant='h4'>Marcos Martini</Typography>
                <Typography className={classes.text} variant='body1'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sed massa pretium, efficitur urna nec, dignissim eros. Vestibulum non odio sollicitudin, fermentum lorem vitae, eleifend orci. Aenean sed rutrum ex. Donec sed mi vel eros aliquet eleifend sed eget mi. Praesent fermentum est eleifend, fringilla neque vitae, feugiat est. Donec sed elit orci. Donec sit amet risus eget leo volutpat aliquam. Nunc convallis quam elit, quis dignissim ipsum tincidunt vitae. Duis venenatis rhoncus mauris at maximus. Ut semper diam sed sodales fringilla. Nam luctus a mi et auctor. Ut consectetur in urna vitae lacinia. In iaculis malesuada porttitor. Morbi bibendum, lectus et ultrices sagittis, libero dui pretium dolor, sit amet mollis lacus metus vitae nisl.</Typography>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3535.846541211405!2d-48.549678585358826!3d-27.598286928790266!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9527383a94d79b3d%3A0xe253ebcd44273a33!2sR.%20Gen.%20Bittencourt%2C%20127%20-%20Centro%2C%20Florian%C3%B3polis%20-%20SC%2C%2088020-100!5e0!3m2!1spt-BR!2sbr!4v1578535318524!5m2!1spt-BR!2sbr" width="600" height="450" frameborder="0" title='location' allowfullscreen=""></iframe>
                <SnackBar />
            </Paper>
        </Container>
    )
}
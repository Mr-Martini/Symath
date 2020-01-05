import { Paper, Container, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import React from 'react'

const useStyles = makeStyles(theme => ({
    paper: {
        backgroundColor: '#4d4d4d',
        color: 'white',
        marginTop: '2em',
        padding: '1em',
        display: 'flex',
        flexDirection: 'column',
        alignItems:"center",
    },
    text: {
        marginTop: '1em',
        marginBottom: '1em',
    },
}))

export default function () {

    const classes = useStyles()

    return (
        <Container maxWidth='lg'>
            <Paper elevation={12} className={classes.paper}>
                <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur quam tortor, suscipit vitae suscipit quis, sodales ac elit. Sed pulvinar dolor ipsum, vitae rutrum tortor fermentum a. Praesent neque massa, malesuada vestibulum mi eu, suscipit pharetra felis. Proin condimentum luctus dui, ac tristique diam dignissim vel.
                </Typography>
                <Typography className={classes.text} color='secondary' variant='h3'>
                    Symath
                </Typography>
            </Paper>
        </Container>
    )
}
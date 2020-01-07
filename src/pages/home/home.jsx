import { Paper, Container, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import InputField from '../../components/input/InputFied'
import React, { useState } from 'react'
import Button from '../../components/input/button'

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
    text: {
        marginTop: '1em',
        marginBottom: '1em',
    },
}))


export default function () {

    const [pureInput, setPureInput] = useState()

    const classes = useStyles()

    const pegarInput = e => {
        e.preventDefault()
        setPureInput(e.target.value)
    }


    return (
        <Container maxWidth='lg'>
            <Paper elevation={12} className={classes.paper}>
                <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur quam tortor, suscipit vitae suscipit quis, sodales ac elit. Sed pulvinar dolor ipsum, vitae rutrum tortor fermentum a. Praesent neque massa, malesuada vestibulum mi eu, suscipit pharetra felis. Proin condimentum luctus dui, ac tristique diam dignissim vel.
                </Typography>
                <Typography className={classes.text} color='secondary' variant='h3'>
                    Symath
                </Typography>
                <InputField
                    pegarInput={pegarInput}
                    id='standard-search'
                    label='Data'
                    type='search'
                    margin='normal'
                    placeholder='Split the numbers by ; e.g(4;4.69;7.77;5)'
                    icone='search'
                />
                {pureInput ?
                    <Button color='secondary' variant='contained' >Calculate</Button>
                    : null}
            </Paper>
        </Container>
    )
}
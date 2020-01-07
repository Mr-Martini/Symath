import { Paper, Container, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import InputField from '../../components/input/InputFied'
import React, { useState } from 'react'
import Button from '../../components/input/button'
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
    text: {
        marginTop: '1em',
        marginBottom: '1em',
    },
    cards: {
        display: 'flex',
        flexWrap: 'wrap',

    }
}))


export default function () {

    const classes = useStyles()

    const [previousData, setPreviousData] = useState()
    const [dados, setDados] = useState()
    const [media, setMedia] = useState()
    const [somatorio, setSomatorio] = useState()
    const [desvioPadraoP, setDesvioPadraoP] = useState()
    const [desvioPadraoA, setDesvioPadraoA] = useState()
    const [start, setStart] = useState(false)

    let separado = []
    let get = []
    let almostThere = []

    const pegarInput = e => {
        e.preventDefault()
        setDados(e.target.value)
    }

    const startOp = () => {

        setStart(!start)

        if (previousData === dados) return
        if (start) return

        if (dados) {
            get = dados.split(';')
            for (let x = 0; x < get.length; ++x) {
                if (get[x] !== '') {
                    almostThere.push(get[x])
                }
            }
            separado = almostThere.map(item => {
                return parseFloat(item, 10)
            })

        }

        if (separado) {
            let x = 0
            let localsoma = 0
            for (x = 0; x < separado.length; ++x) {
                localsoma = localsoma + separado[x]
            }
            setSomatorio(localsoma)
            setMedia(localsoma / x)
        }

        let localsoma = 0
        let x = 0
        for (x = 0; x < separado.length; ++x) {
            localsoma = localsoma + separado[x]
        }
        let localmedia = localsoma / x
        let difquad = 0
        let dif = 0
        for (x = 0; x < separado.length; ++x) {
            dif = separado[x] - localmedia
            difquad = Math.pow(dif, 2) + difquad
        }
        setDesvioPadraoP(Math.sqrt(difquad / x))
        setDesvioPadraoA(Math.sqrt(difquad / (x - 1)))

        setPreviousData(dados)
        console.log('calculated')

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
                {dados ?
                    <Button color='secondary' onClick={startOp} variant='contained' >{start ? 'Hide' : 'Calculate'}</Button>
                    : null}
                <div className={classes.cards}>
                {start ?
                    ['Sum & average', 'S Stardand Deviation & P Stard. Dev.'].map((text, index) => (
                        <InfoCard
                            key={index}
                            type={text}
                            first={index === 0 ? 'Av: ' + media : 'S: ' + desvioPadraoA}
                            second={index === 0 ? 'Sum: ' + somatorio : 'P: ' + desvioPadraoP}
                        ></InfoCard>
                        
                    ))
                    : null
                }
                </div>
            </Paper>
        </Container>
    )
}
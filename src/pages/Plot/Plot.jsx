import { makeStyles } from '@material-ui/core/styles';
import { Paper, Container, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { XYPlot, LineSeries, VerticalGridLines, HorizontalGridLines, XAxis, YAxis, MarkSeries } from 'react-vis'
import InputField from '../../components/input/InputFied'
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
        margin: theme.spacing(2),
    },
    graph: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
    }
}))

export default function () {

    const [previousDataX, setPreviousDataX] = useState()
    const [previousDataY, setPreviousDataY] = useState()
    const [start, setStart] = useState(false)
    const [dadosX, setDadosX] = useState()
    const [dadosY, setDadosY] = useState()
    const [showData, setShowData] = useState(false)
    const [data, setData] = useState(
        [
            { x: 0, y: 8 },
            { x: 1, y: 5 },
            { x: 2, y: 4 },
            { x: 3, y: 9 },
            { x: 4, y: 1 },
            { x: 5, y: 7 },
            { x: 6, y: 6 },
            { x: 7, y: 3 },
            { x: 8, y: 2 },
            { x: 9, y: 0 }
        ]
    )

    const pegarXaxis = e => {
        e.preventDefault()
        setDadosX(e.target.value)
    }
    const pegarYaxis = e => {
        e.preventDefault()
        setDadosY(e.target.value)
    }

    let separadoY = []
    let getY = []
    let almostThereY = []
    let separadoX = []
    let getX = []
    let almostThereX = []
    let unified = []

    const startOp = () => {
        setStart(!start)
        setShowData(!showData)

        if (previousDataX === dadosX && previousDataY === dadosY) return
        if (start) return

        if (dadosX) {
            getX = dadosX.split(';')
            for (let x = 0; x < getX.length; ++x) {
                if (getX[x] !== '') {
                    almostThereX.push(getX[x])
                }
            }
            separadoX = almostThereX.map(item => {
                return parseFloat(item, 10)
            })

        }

        if (dadosY) {
            getY = dadosY.split(';')
            for (let x = 0; x < getY.length; ++x) {
                if (getY[x] !== '') {
                    almostThereY.push(getY[x])
                }
            }
            separadoY = almostThereY.map(item => {
                return parseFloat(item, 10)
            })

        }
        setPreviousDataX(dadosX)
        setPreviousDataY(dadosY)

        for (let x = 0; x < separadoX.length; ++x) {
            unified.push({ x: separadoX[x], y: separadoY[x]})
        }
        setData(unified)
    }

    const classes = useStyles()

    return (
        <Container>
            <Paper className={classes.paper} elevation={12}>
                <Typography variant='h4' color='secondary'>Plotting</Typography>
                <Typography className={classes.text} variant='body1'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sed massa pretium, efficitur urna nec, dignissim eros. Vestibulum non odio sollicitudin, fermentum lorem vitae, eleifend orci. Aenean sed rutrum ex. Donec sed mi vel eros aliquet eleifend sed eget mi. Praesent fermentum est eleifend, fringilla neque vitae, feugiat est. Donec sed elit orci. Donec sit amet risus eget leo volutpat aliquam. Nunc convallis quam elit, quis dignissim ipsum tincidunt vitae. Duis venenatis rhoncus mauris at maximus. Ut semper diam sed sodales fringilla. Nam luctus a mi et auctor. Ut consectetur in urna vitae lacinia. In iaculis malesuada porttitor. Morbi bibendum, lectus et ultrices sagittis, libero dui pretium dolor, sit amet mollis lacus metus vitae nisl.</Typography>
                <InputField
                    pegarInput={pegarXaxis}
                    id='standard-search'
                    label='X Axis'
                    type='search'
                    margin='normal'
                    placeholder='Split the numbers by ; e.g(4;4.69;7.77;5)'
                    icone='graph'
                />
                <InputField
                    pegarInput={pegarYaxis}
                    id='standard-search'
                    label='Y Axis'
                    type='search'
                    margin='normal'
                    placeholder='Split the numbers by ; e.g(4;4.69;7.77;5)'
                    icone='graph'
                />
                {dadosX && dadosY ?
                    <Button
                        color='secondary'
                        onClick={startOp}
                        variant='contained'>
                        {start ? 'Hide' : 'Plot Graph'}
                    </Button>
                    : null
                }
                {showData ?
                    <Paper className={classes.graph} elevation={12}>
                        <XYPlot height={300} width={400} stroke='red'>
                            <VerticalGridLines style={{ stroke: '#B7E9ED' }} />
                            <HorizontalGridLines style={{ stroke: '#B7E9ED' }} />
                            <XAxis title='X Axis'
                                style={{
                                    line: { stroke: '#ADDDE1' },
                                    ticks: { stroke: '#ADDDE1' },
                                    text: { stroke: 'none', fill: '#6b6b76', fontWeight: 600 },
                                }}
                            />
                            <YAxis title='Y Axis' />
                            <LineSeries data={data} />
                            <MarkSeries
                                className="mark-series-example"

                                data={data} />
                        </XYPlot>
                    </Paper>
                    : null
                }
            </Paper>
        </Container>
    )
}
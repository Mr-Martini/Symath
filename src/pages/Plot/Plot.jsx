import { makeStyles } from '@material-ui/core/styles';
import { Paper, Container, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import InputField from '../../components/input/InputFied'
import Button from '../../components/input/button'
import BottomBar from '../../components/navbar/BottomBar/BottomBar'
import PlotComponent from '../../components/Graphs/PlotComponent/PlotComponent'
import regression from 'regression'

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
    },
    options: {
        display: 'flex',
        justifyContent: 'center',
    }
}))

export default function () {

    const [dataLinear, setDataLinear] = useState([])
    const [circleColor, setCircleColor] = useState('#ADDDE1')
    const [lineColor, setLineColor] = useState('#ADDDE1')
    const [XaxisName, setXaxisName] = useState()
    const [YaxisName, setYaxisName] = useState()
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
    const [toggleSwitch, setToggleSwitch] = useState({
        A: false,
        B: false,
        C: false,
        D: false,
        E: false,
    })

    const startOp = () => {

        setStart(!start)
        setShowData(!showData)

        if (previousDataX === dadosX && previousDataY === dadosY) return
        if (start) return

        let separadoY = []
        let getY = []
        let almostThereY = []
        let separadoX = []
        let getX = []
        let almostThereX = []
        let unified = []
        let getVector = []
        let getDataLinear = []

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
            unified.push({ x: separadoX[x], y: separadoY[x] })
        }

        for (let i = 0; i < unified.length; ++i) {
            getVector.push([unified[i].x, unified[i].y])
        }

        const linearPoints = regression.linear(getVector)

        for (let i = 0; i < linearPoints.points.length; ++i) {
            getDataLinear.push({ x: linearPoints.points[i][0], y: linearPoints.points[i][1] })
        }
        setData(unified)
        setDataLinear(getDataLinear)
    }

    const handleXaxisName = (e) => {
        setXaxisName(e.target.value)
    }

    const handleYaxisName = (e) => {
        setYaxisName(e.target.value)
    }

    const takeLineColor = e => {
        setLineColor(e.target.value)
    }

    const takeCircleColor = e => {
        setCircleColor(e.target.value)
    }

    const pegarXaxis = e => {
        e.preventDefault()
        setDadosX(e.target.value)
    }
    const pegarYaxis = e => {
        e.preventDefault()
        setDadosY(e.target.value)
    }

    const handleChange = name => event => {
        setToggleSwitch({ ...toggleSwitch, [name]: event.target.checked });
    };

    const classes = useStyles()

    return (
        <Container>
            <Paper className={classes.paper} elevation={12}>
                <Typography variant='h4' color='secondary'>Plotting</Typography>
                <Typography className={classes.text} variant='body1'>Loremç ipsum dolor sit amet, consectetur adipiscing elit. Cras sed massa pretium, efficitur urna nec, dignissim eros. Vestibulum non odio sollicitudin, fermentum lorem vitae, eleifend orci. Aenean sed rutrum ex. Donec sed mi vel eros aliquet eleifend sed eget mi. Praesent fermentum est eleifend, fringilla neque vitae, feugiat est. Donec sed elit orci. Donec sit amet risus eget leo volutpat aliquam. Nunc convallis quam elit, quis dignissim ipsum tincidunt vitae. Duis venenatis rhoncus mauris at maximus. Ut semper diam sed sodales fringilla. Nam luctus a mi et auctor. Ut consectetur in urna vitae lacinia. In iaculis malesuada porttitor. Morbi bibendum, lectus et ultrices sagittis, libero dui pretium dolor, sit amet mollis lacus metus vitae nisl.</Typography>
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
                    <div className={classes.options}>
                        <Button
                            color='secondary'
                            onClick={startOp}
                            variant='contained'>
                            {start ? 'Hide' : 'Plot Graph'}
                        </Button>
                        <BottomBar
                            pegarInputX={handleXaxisName}
                            pegarInputY={handleYaxisName}
                            takeLineColor={takeLineColor}
                            takeCircleColor={takeCircleColor}
                            toggleSwitch={toggleSwitch}
                            handleChange={handleChange}
                        />
                    </div>
                    : null
                }
                {showData ?
                    <Paper className={classes.graph} elevation={12}>
                        <PlotComponent
                            data={data}
                            dataLinear={toggleSwitch.A ? dataLinear : null}
                            width={800}
                            height={600}
                            Xtitle={XaxisName ? XaxisName : 'X Axis'}
                            Ytitle={YaxisName ? YaxisName : 'Y Axis'}
                            lineColor={lineColor}
                            circleColor={circleColor}
                        />
                    </Paper>
                    : null
                }
            </Paper>
        </Container>
    )
}
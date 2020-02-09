import { makeStyles } from '@material-ui/core/styles';
import { Paper, Container, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import InputField from '../../components/input/InputFied'
import Button from '../../components/input/button'
import BottomBar from '../../components/navbar/BottomBar/BottomBar'
import PlotComponent from '../../components/Graphs/PlotComponent/PlotComponent'
import regression from 'regression'
import { connect } from 'react-redux'
import { PlotComponentFlexible } from '../../components/Graphs/PlotView/PlotView'

const useStyles = makeStyles(theme => ({
    paper: {
        backgroundColor: '#4d4d4d',
        color: 'white',
        marginTop: '2em',
        padding: '1em',
        display: 'flex',
        flexDirection: 'column',
        alignItems: "center",
        marginBottom: theme.spacing(10)
    },
    text: {
        margin: theme.spacing(2),
    },
    graph: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        width: '100%',
        maxWidth: '800px'
    },
    options: {
        display: 'flex',
        justifyContent: 'center',
    }
}))

const PlotPage = ({ switchState }) => {

    const [plotHeight, setPlotHeight] = useState(600)
    const [dataLinear, setDataLinear] = useState([])
    const [circleColor, setCircleColor] = useState('cadetblue')
    const [lineColor, setLineColor] = useState('black')
    const [XaxisName, setXaxisName] = useState()
    const [YaxisName, setYaxisName] = useState()
    const [previousDataX, setPreviousDataX] = useState()
    const [previousDataY, setPreviousDataY] = useState()
    const [start, setStart] = useState(false)
    const [dadosX, setDadosX] = useState()
    const [dadosY, setDadosY] = useState()
    const [additionalInfo, setAdditionalInfo] = useState()
    const [createdAt, setCreatedAt] = useState()
    const [errorForA, setErrorForA] = useState()
    const [errorForB, setErrorForB] = useState()
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

    const startOp = () => {

        if (previousDataX === dadosX && previousDataY === dadosY) return

        setStart(true)

        let separadoY = []
        let getY = []
        let almostThereY = []
        let separadoX = []
        let getX = []
        let almostThereX = []
        let unified = []
        let getVector = []
        let getDataLinear = []
        let deltaY = []
        let deltaYSquare = []
        let sumDeltaYSquare = 0 //chi quadrado
        let sumX = 0
        let xSquare = []
        let sumXSquare = 0


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

        const linearPoints = regression.linear(getVector, { precision: 8 })
        setAdditionalInfo(linearPoints)

        const sizeX = separadoX.length

        for (let i = 0; i < sizeX; ++i) {
            deltaY.push(separadoY[i] - linearPoints.equation[0] * separadoX[i] - linearPoints.equation[1])
            deltaYSquare.push(deltaY[i] * deltaY[i])
            sumDeltaYSquare = sumDeltaYSquare + deltaYSquare[i]
            sumX = sumX + separadoX[i]
            xSquare.push(separadoX[i] * separadoX[i])
            sumXSquare = sumXSquare + xSquare[i]
        }

        const standardError = Math.sqrt(sumDeltaYSquare / (sizeX - 2))

        setErrorForA(Math.sqrt((sizeX * standardError ** 2) / (sizeX * sumXSquare - sumX ** 2)).toFixed(8))
        setErrorForB(Math.sqrt((standardError ** 2 * sumXSquare ** 2) / (sizeX * sumXSquare - sumX ** 2)))

        for (let i = 0; i < linearPoints.points.length; ++i) {
            getDataLinear.push({ x: linearPoints.points[i][0], y: linearPoints.points[i][1] })
        }
        setData(unified)
        setDataLinear(getDataLinear)
        const dateAndtime = new Date()
        setCreatedAt(`${dateAndtime.getDate()}/${dateAndtime.getMonth()}/${dateAndtime.getFullYear()}   ${dateAndtime.getHours()}h:${dateAndtime.getMinutes()}m:${dateAndtime.getSeconds()}s `)
        console.log('calculated')
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

    document.body.onresize = function () {
        if (document.body.clientWidth <= 600) {
            setPlotHeight(262.5)
        }
        else {
            setPlotHeight(600)
        }
    }

    document.body.onload = function () {
        if (document.body.clientWidth <= 600) {
            setPlotHeight(262.5)
        }
    }

    const classes = useStyles()

    return (
        <Container>
            <Paper className={classes.paper} elevation={12}>
                <Typography variant='h3' color='inherit'>Plotting</Typography>
                <Typography className={classes.text} variant='body1'>Loremç ipsumc dolor sit amet, consectetur adipiscing elit. Cras sed massa pretium, efficitur urna nec, dignissim eros. Vestibulum non odio sollicitudin, fermentum lorem vitae, eleifend orci. Aenean sed rutrum ex. Donec sed mi vel eros aliquet eleifend sed eget mi. Praesent fermentum est eleifend, fringilla neque vitae, feugiat est. Donec sed elit orci. Donec sit amet risus eget leo volutpat aliquam. Nunc convallis quam elit, quis dignissim ipsum tincidunt vitae. Duis venenatis rhoncus mauris at maximus. Ut semper diam sed sodales fringilla. Nam luctus a mi et auctor. Ut consectetur in urna vitae lacinia. In iaculis malesuada porttitor. Morbi bibendum, lectus et ultrices sagittis, libero dui pretium dolor, sit amet mollis lacus metus vitae nisl.</Typography>
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
                            Plot Graph
                        </Button>
                        <BottomBar
                            pegarInputX={handleXaxisName}
                            pegarInputY={handleYaxisName}
                            takeLineColor={takeLineColor}
                            takeCircleColor={takeCircleColor}
                        />
                    </div>
                    : null
                }
                {start ?
                    <>
                        {[switchState.A ? data : null, switchState.B ? dataLinear : null].map((type, index) => (
                            <Paper key={index} className={classes.graph} elevation={12}>

                                {type ?
                                    <div>
                                        <PlotComponent
                                            data={type}
                                            key={type}
                                            height={plotHeight}
                                            Xtitle={XaxisName ? XaxisName : 'X Axis'}
                                            Ytitle={YaxisName ? YaxisName : 'Y Axis'}
                                            lineColor={lineColor}
                                            circleColor={circleColor}
                                            isLinear={index === 1 ? true : false}
                                            r2={additionalInfo.r2}
                                            A={additionalInfo.equation[0]}
                                            B={additionalInfo.equation[1]}
                                            createdAt={createdAt}
                                            errorForA={errorForA}
                                            errorForB={errorForB}
                                        />
                                        <PlotComponentFlexible
                                            data={type}
                                            key={index}
                                            height={plotHeight}
                                            Xtitle={XaxisName ? XaxisName : 'X Axis'}
                                            Ytitle={YaxisName ? YaxisName : 'Y Axis'}
                                            lineColor={lineColor}
                                            circleColor={circleColor}
                                        />
                                    </div>
                                    : null
                                }

                            </Paper>
                        ))}
                    </>
                    : null
                }
            </Paper>
        </Container>
    )
}

const mapState = (state) => {
    const switchState = state.SwitchReducer
    return { switchState }
}


export default connect(mapState)(PlotPage)
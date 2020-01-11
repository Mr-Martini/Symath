import React, { useRef } from 'react'
import { XYPlot, LineMarkSeries, VerticalGridLines, HorizontalGridLines, XAxis, YAxis } from 'react-vis'
import ReactToPrint from 'react-to-print';
import Button from '../../input/button'
import '../PlotComponent/PlotToPrint.css'

class PlotComponent extends React.Component {

    render() {

        const {
            height,
            width,
            Xtitle,
            Ytitle,
            lineColor,
            circleColor,
            data,
            dataLinear,
            dataExponential,
            dataLogarithmic,
            dataPower,
            dataPolynomial,
        } = this.props

        const regressions = [
            data,
            dataLinear,
            dataExponential,
            dataLogarithmic,
            dataPower,
            dataPolynomial,
        ]

        return (
            <XYPlot height={height} width={width} stroke='red'>
                <VerticalGridLines style={{ stroke: '#B7E9ED' }} />
                <HorizontalGridLines style={{ stroke: '#B7E9ED' }} />
                <XAxis title={Xtitle}
                    style={{
                        line: { stroke: '#ADDDE1' },
                        ticks: { stroke: '#ADDDE1' },
                        text: { stroke: 'none', fill: '#6b6b76', fontWeight: 600 },
                    }}
                />
                <YAxis title={Ytitle} />

                {regressions.map((type, index) => (
                    <LineMarkSeries
                        style={{
                            strokeWidth: '3px',
                            color: 'white'
                        }}
                        lineStyle={{ stroke: lineColor }}
                        markStyle={{ stroke: circleColor }}
                        data={type}
                        key={index}
                    />
                ))}
            </XYPlot>
        )
    }
}

const PlotToPrint = ({
    height,
    width,
    Xtitle,
    Ytitle,
    lineColor,
    circleColor,
    data,
    dataLinear,
    dataExponential,
    dataLogarithmic,
    dataPower,
    dataPolynomial,
}) => {
    const componentRef = useRef();
    return (
        <div>
            <ReactToPrint
                trigger={() => <Button size='large' color='secondary' variant='contained'>Print</Button>}
                content={() => componentRef.current}
                pageStyle='printedView'
                bodyClass='printedView'
            />
            <PlotComponent
                ref={componentRef}
                data={data}
                dataLinear={dataLinear}
                width={width}
                height={height}
                Xtitle={Xtitle}
                Ytitle={Ytitle}
                lineColor={lineColor}
                circleColor={circleColor}
            />
        </div>
    );
};

export default PlotToPrint
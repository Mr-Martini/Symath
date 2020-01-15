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
        } = this.props

        return (
            <XYPlot height={height} width={width} stroke='red'>
                <VerticalGridLines style={{ stroke: 'black' }} />
                <HorizontalGridLines style={{ stroke: 'black' }} />
                <XAxis title={Xtitle}
                    style={{
                        line: { stroke: 'black' },
                        ticks: { stroke: 'black' },
                        text: { stroke: 'none', fill: 'black', fontWeight: 600 },
                    }}
                />
                <YAxis title={Ytitle} />

                    <LineMarkSeries
                        style={{
                            strokeWidth: '3px',
                            color: 'white'
                        }}
                        lineStyle={{ stroke: lineColor }}
                        markStyle={{ stroke: circleColor }}
                        data={data}
                    />
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
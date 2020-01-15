import React, { useRef } from 'react'
import { LineMarkSeries, VerticalGridLines, HorizontalGridLines, XAxis, YAxis, FlexibleWidthXYPlot } from 'react-vis'
import ReactToPrint from 'react-to-print';
import Button from '../../input/button'
import '../PlotComponent/PlotToPrint.css'

class PlotComponent extends React.Component {

    render() {

        const {
            height,
            Xtitle,
            Ytitle,
            lineColor,
            circleColor,
            data,
        } = this.props

        return (
            <FlexibleWidthXYPlot height={height} stroke='red'>
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
            </FlexibleWidthXYPlot>
        )
    }
}

const PlotToPrint = ({
    height,
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
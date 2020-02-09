import React from 'react'
import { LineMarkSeries, VerticalGridLines, HorizontalGridLines, XAxis, YAxis, FlexibleWidthXYPlot, XYPlot } from 'react-vis'
import '../PlotComponent/PlotToPrint.css'

export class PlotComponentFlexible extends React.Component {

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

export class PlotComponentForPDF extends React.Component {

    render() {

        const {
            Xtitle,
            Ytitle,
            lineColor,
            circleColor,
            data,
            isLinear,
            createdAt,
            r2,
            A,
            B,
            errorForA,
            errorForB
        } = this.props


        return (
            <XYPlot height={600} width={800} stroke='red'>
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
                {isLinear ?
                    <div className='paper-info'>
                        <p>{createdAt}</p>
                        <p>B (y-intercept): {B} +/- {errorForB}</p>
                        <p>A (slope): {A} +/- {errorForA} </p>
                        <p>R^2: {r2}</p>
                    </div>
                    : null
                }
            </XYPlot>
        )
    }
}

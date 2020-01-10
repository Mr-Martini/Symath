import React from 'react'
import { XYPlot, LineMarkSeries, VerticalGridLines, HorizontalGridLines, XAxis, YAxis } from 'react-vis'

export default function ({ height, width, Xtitle, Ytitle, lineColor, circleColor, data, typeOfData, numberOfGraphs }) {

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
import React, { useState } from 'react'
import { XYPlot, LineMarkSeries, VerticalGridLines, HorizontalGridLines, XAxis, YAxis } from 'react-vis'
import regression from 'regression'

export default function ({ height, width, Xtitle, Ytitle, lineColor, circleColor, data, typeOfData }) {

    let getVector = []
    let dataLinear = []

    for (let i = 0; i < data.length; ++i) {
        getVector.push([data[i].x, data[i].y])
    }

    const linearPoints = regression.linear(getVector)

    for (let i = 0; i < linearPoints.points.length; ++i) {
        dataLinear.push({ x: linearPoints.points[i][0], y: linearPoints.points[i][1] })
    }

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
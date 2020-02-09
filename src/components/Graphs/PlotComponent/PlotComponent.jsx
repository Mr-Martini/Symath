import React, { useRef } from 'react'
import ReactToPrint from 'react-to-print';
import Button from '../../input/button'
import '../PlotComponent/PlotToPrint.css'

import { PlotComponentForPDF } from '../PlotView/PlotView'

const PlotToPrint = ({
    height,
    Xtitle,
    Ytitle,
    lineColor,
    circleColor,
    data,
    isLinear,
    A,
    B,
    r2,
    createdAt,
    errorForA,
    errorForB,
    chiSquare
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
            <div style={{ display: 'none'}}>
                <PlotComponentForPDF
                    ref={componentRef}
                    data={data}
                    height={height}
                    Xtitle={Xtitle}
                    Ytitle={Ytitle}
                    lineColor={lineColor}
                    circleColor={circleColor}
                    isLinear={isLinear}
                    A={A}
                    B={B}
                    r2={r2}
                    createdAt={createdAt}
                    errorForA={errorForA}
                    errorForB={errorForB}
                    chiSquare={chiSquare}
                />
            </div>
        </div>
    );
};
export default PlotToPrint
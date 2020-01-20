import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import './style.css'

const SimpleBackdrop = WrappedComponent => ({ isLoading, ...props }) => {

    return isLoading ?
        (
            <div>
                <Backdrop className='backdrop' open={isLoading} >
                    <CircularProgress color="secondary" />
                </Backdrop>
            </div>
        )
        : (
            <WrappedComponent {...props} />
        )
}

export default SimpleBackdrop
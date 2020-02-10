import { Paper, Typography, Container, makeStyles } from '@material-ui/core'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { startDownloadData } from '../../Redux/Data/DataAction'
import Progress from '../Feedback/Progress'
import '../ProfileContent/ProfileContentCss.css'

const useStyles = makeStyles(theme => ({
    paper: {
        backgroundColor: '#4d4d4d',
        color: 'white',
        marginTop: '2em',
        padding: '1em',
        display: 'flex',
        flexDirection: 'column',
        alignItems: "center",
        marginBottom: theme.spacing(5)
    },
    data: {
        backgroundColor: '#4d4d4d',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '0.5em',
        width: '40%',
        overflow: 'hidden'
    }
}))

const ProfileContent = ({ downloadData, pdfsForDownload, isLoading }) => {

    const classes = useStyles()

    useEffect(() => {
        downloadData()
        console.log("profileLoop?")
    }, [downloadData])

    return (
        <Container maxWidth='sm'>
            <Paper className={classes.paper} elevation={12}>
                <Typography variant='h6' color='inherit'>Your files</Typography>
                <>
                    {!isLoading ?
                        <>
                            {pdfsForDownload ?
                                pdfsForDownload.map((data, index) => (
                                    <Paper elevation={6} className={classes.data} key={index}>
                                        <div style={{ cursor: 'pointer' }}>
                                            <a className='see-file-button' rel="noopener noreferrer" href={data.url} target='_blank'>See file</a>
                                        </div>
                                        <Typography variant='subtitle1' style={{ color: 'white' }}>{data.name}</Typography>
                                    </Paper>
                                ))
                                : <Typography>No data found</Typography>
                            }
                        </>
                        : <Progress />
                    }
                </>
            </Paper>
        </Container>
    )
}

const mapDispatch = dispatch => ({
    downloadData: () => dispatch(startDownloadData())
})

const mapState = state => ({
    pdfsForDownload: state.DataReducer.graphs,
    isLoading: state.DataReducer.isLoadingPdf
})

export default connect(mapState, mapDispatch)(ProfileContent)
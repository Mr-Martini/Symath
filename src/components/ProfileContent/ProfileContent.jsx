import { Paper, Typography, Container, makeStyles } from '@material-ui/core'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { startDownloadData, startDeleteData } from '../../Redux/Data/DataAction'
import Progress from '../Feedback/Progress'
import '../ProfileContent/ProfileContentCss.css'
import { Delete } from '@material-ui/icons'

const useStyles = makeStyles(theme => ({
    paper: {
        backgroundColor: '#202125',
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
        justifyContent: 'center',
        marginBottom: '0.5em',
        width: '40%',
        overflow: 'hidden',
        marginTop: '1em',
        marginRight: '0.7em',
        padding: '0.3em',
    },
    boxes: {
        backgroundColor: '#202125',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
    }
}))

const ProfileContent = ({ downloadData, pdfsForDownload, isLoadingContent, isDeletingFile, deleteData }) => {

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
                    {!isLoadingContent ?
                        <Paper elevation={0} className={classes.boxes}>
                            {pdfsForDownload ?
                                pdfsForDownload.map((data, index) => (
                                    <Paper elevation={12} className={classes.data} key={index}>
                                        <div style={{ cursor: 'pointer' }}>
                                            <a className='see-file-button' rel="noopener noreferrer" href={data.url} target='_blank'>See file</a>
                                        </div>
                                        <Typography variant='subtitle1' style={{ color: 'white' }}>{data.name}</Typography>
                                        {isDeletingFile ?
                                            <Progress />
                                            :
                                            <Delete onClick={() => deleteData(data.name)} style={{ color: 'rgba(255, 71, 71, 0.993)', cursor: 'pointer' }} />}
                                    </Paper>
                                ))
                                : <Typography>No data found</Typography>
                            }
                        </Paper>
                        : <Progress />
                    }
                </>
            </Paper>
        </Container>
    )
}

const mapDispatch = dispatch => ({
    downloadData: () => dispatch(startDownloadData()),
    deleteData: (name) => dispatch(startDeleteData(name))
})

const mapState = state => ({
    pdfsForDownload: state.DataReducer.graphs,
    isLoadingContent: state.DataReducer.isLoadingPdf,
    isDeletingFile: state.DataReducer.isDeletingFile
})

export default connect(mapState, mapDispatch)(ProfileContent)
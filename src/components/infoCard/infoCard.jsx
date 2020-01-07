import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import UploadIcon from '@material-ui/icons/CloudUpload'

const useStyles = makeStyles(theme => ({
    card: {
        flexGrow: 1,
        minWidth: 275,
        marginBottom: theme.spacing(3),
        marginTop: theme.spacing(3),
        marginRight: theme.spacing(2),
        textAlign: 'center',
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: '#202124',
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 16,
        color: 'white',
    },
    pos: {
        marginBottom: 12,
        color: 'white'
    },
    icon: {
        cursor: 'pointer'
    }
}));

export default function SimpleCard({ type, first, second }) {
    const classes = useStyles();

    return (
        <Card className={classes.card} elevation={12}>
            <CardContent>
                <Typography className={classes.title} color="primary" gutterBottom>
                    {type}
                </Typography>
                <Typography className={classes.pos} color="inherit">
                    {first}
                </Typography>
                <Typography color='primary' className={classes.title} gutterBottom>
                    {second}
                </Typography>
            </CardContent>
            <CardActions>
                <UploadIcon className={classes.icon} color='primary' fontSize='large' />
            </CardActions>
        </Card>
    );
}
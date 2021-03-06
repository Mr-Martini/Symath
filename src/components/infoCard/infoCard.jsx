import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import UploadIcon from '@material-ui/icons/CloudUpload'
import ShowMore from '@material-ui/icons/More'

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
    },
    pos: {
        marginBottom: 12,
        color: 'white',
    },
    icon: {
        cursor: 'pointer',
    },
    second: {
        color: 'white'
    }
}));

export default function SimpleCard({ type, first, second, icon, onClick }) {
    const classes = useStyles();

    return (
        <Card className={classes.card} elevation={12}>
            <CardContent>
                <Typography className={classes.title} color="secondary" gutterBottom>
                    {type}
                </Typography>
                <Typography className={classes.pos} color="inherit">
                    {first}
                </Typography>
                <Typography className={classes.second}>
                    {second}
                </Typography>
            </CardContent>
            <CardActions onClick={onClick}>
                {icon === 'upload' ? <UploadIcon className={classes.icon} color='secondary' fontSize='large' /> : null}
                {icon === 'showMore' ? <ShowMore className={classes.icon} color='secondary' fontSize='large' /> : null}
            </CardActions>
        </Card>
    );
}
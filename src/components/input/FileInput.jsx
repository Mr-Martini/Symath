import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import UploadIcon from '@material-ui/icons/CloudUpload'

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
}));

export default function UploadButtons({ accept, children, onChange, id }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <input
        accept={accept}
        onChange={onChange}
        className={classes.input}
        id={id}
        multiple
        type="file"
      />
      <label htmlFor={id}>
        <Button variant="contained" color="secondary" component="span" startIcon={ <UploadIcon />}>
          {children}
        </Button>
      </label>
    </div>
  );
}
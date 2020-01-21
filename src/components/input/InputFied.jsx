import React from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {TextField} from '@material-ui/core'
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search'
import DonutSmall from '@material-ui/icons/DonutSmall'

const useStyles = makeStyles(theme => ({
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        marginBottom: theme.spacing(1),
        width: "60%",
        borderRadius: '0.4em',
        minWidth: '130px',
    },
    input: {
      color: 'white'
    }
}));

const CssTextField = withStyles({
    root: {
      '& label.Mui-focused': {
        color: 'lightgreen',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: 'green',
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: '#F50057',
        },
        '&:hover fieldset': {
          borderColor: 'yellow',
        },
        '&.Mui-focused fieldset': {
          borderColor: 'green',
        },
      },
    },
  })(TextField);


export default function ({ pegarInput, id, label, type, margin, placeholder, icone, width, accept }) {

    const classes = useStyles()

    return (
        <CssTextField
            InputLabelProps={{
                className: classes.input
            }}
            id={id}
            label={label}
            style={{ width: width }}
            type={type}
            className={classes.textField}
            margin={margin}
            placeholder={placeholder}
            onChange={pegarInput}
            color='secondary'
            variant='outlined'
            InputProps={{
                className: classes.input,
                startAdornment: (
                  <InputAdornment position="start">
                    { icone === 'search' ?
                    <SearchIcon /> : <DonutSmall />
                    }
                  </InputAdornment>
                ),
              }}
              inputProps={{
                accept: accept
              }}
            
        />
    )

}
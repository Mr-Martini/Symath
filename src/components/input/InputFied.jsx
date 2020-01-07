import React from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {TextField} from '@material-ui/core'
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search'

const useStyles = makeStyles(theme => ({
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        marginBottom: theme.spacing(1),
        width: "60%",
        borderRadius: '0.4em',
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


export default function ({ pegarInput, id, label, type, margin, placeholder, icone }) {

    const classes = useStyles()

    return (
        <CssTextField
            InputLabelProps={{
                className: classes.input
            }}
            id={id}
            label={label}
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
                    <SearchIcon /> : null
                    }
                  </InputAdornment>
                ),
              }}
            
        />
    )

}
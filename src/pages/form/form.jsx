import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import LinkM from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { START_SIGN_IN_EMAIL, START_SIGN_UP_EMAIL } from '../../Redux/User/UserActions'
import FeedBack from '../../components/Feedback/Feedback'

function Copyright() {
  return (
    <Typography variant="body2" color="secondary" align="center">
      {'Copyright ©Symath '}
      <Link color='secondary' to='/'>
        Symath
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: theme.spacing(10)
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  input: {
    color: 'white',
  },
}));

const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: 'green',
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

const Form = ({ match, START_SIGN_UP_EMAIL, START_SIGN_IN_EMAIL, userStore }) => {

  const classes = useStyles();

  const [userCredentials, setUserCredentials] = useState({
    password: '',
    email: '',
    userName: '',
  })

  const [open, setOpen] = useState(false)

  const handleSubmit = e => {
    e.preventDefault()
    setOpen(true)

    if (match.url === '/register') {
      START_SIGN_UP_EMAIL(userCredentials)
    }
    else if (match.url === '/login') {
      START_SIGN_IN_EMAIL({ email: userCredentials.email, password: userCredentials.password })
    }
  }

  const handleChange = e => {

    const { name, value } = e.target

    setUserCredentials({ ...userCredentials, [name]: value })
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Container component="main" maxWidth="xs">

      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography color='secondary' component="h1" variant="h5">
          {match.path === '/login' ? 'Sign In' : 'Register'}
        </Typography>
        { userStore.error ?
          <FeedBack
          error={userStore.error}
          open={open}
          handleClose={handleClose}
        /> : null}
        <form className={classes.form} noValidate>
          {match.path === '/register' ?
            <CssTextField
              InputLabelProps={{
                className: classes.input
              }}
              inputProps={{
                className: classes.input
              }}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="standart"
              label="name"
              name="userName"
              autoComplete="name"
              autoFocus
              color='secondary'
              onChange={handleChange}
            />
            : null
          }
          <CssTextField
            InputLabelProps={{
              className: classes.input
            }}
            inputProps={{
              className: classes.input
            }}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            color='secondary'
            onChange={handleChange}
          />
          <CssTextField
            InputLabelProps={{
              className: classes.input
            }}
            inputProps={{
              className: classes.input
            }}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            color='secondary'
            onChange={handleChange}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color='secondary' />}
            label="Remember me"

          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            color='secondary'
            className={classes.submit}
            onClick={handleSubmit}
          >
            {match.path === '/login' ? 'Sign In' : 'Register'}
          </Button>
          <Grid container>
            <Grid item xs>
              <LinkM color='secondary' href="#" variant="body2">
                Forgot password?
              </LinkM>
            </Grid>
            <Grid item>
              <LinkM color='secondary' component={Link} to={match.path === '/login' ? '/register' : '/login'} variant="body2">
                {match.path === '/login' ? "Don't have an account? Sign Up" : 'I already have an account'}
              </LinkM>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

const mapDispatch = dispatch => {
  return {
    START_SIGN_IN_EMAIL: (userCredentials) => dispatch(START_SIGN_IN_EMAIL(userCredentials)),
    START_SIGN_UP_EMAIL: (userCredentials) => dispatch(START_SIGN_UP_EMAIL(userCredentials)),
  }
}

const mapState = state => ({
  userStore: state.UserReducer
})

export default compose(
  withRouter,
  connect(mapState, mapDispatch)
)(Form)
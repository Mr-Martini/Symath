import React from 'react';
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
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'

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

const Form = ({ match }) => {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">

      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography color='secondary' component="h1" variant="h5">
          {match.path === '/login' ? 'Sign In' : 'Register'}
        </Typography>
        <form className={classes.form} noValidate>
          {match.path === '/register' ?
            <TextField
              InputLabelProps={{
                className: classes.input
              }}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="standart"
              label="name"
              name="name"
              autoComplete="name"
              autoFocus
              color='secondary'
            />
            : null
          }
          <TextField
            InputLabelProps={{
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
          />
          <TextField
            InputLabelProps={{
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
          />
          <FormControlLabel
            control={<Checkbox value="remember" color='secondary' />}
            label="Remember me"
            
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color='secondary'
            className={classes.submit}
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

export default withRouter(Form)
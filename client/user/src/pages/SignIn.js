import React, { useState, useEffect } from 'react';
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from '../redux/actions/usersActions';
//Routing
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
//Styles
import styled from 'styled-components';
import { StyledMotionDiv } from '../styles/styles';
//Components
import Loader from '../components/Loader';
import CustomTextField from '../components/ui-elements/CustomTextField';
//Animation 
import { pageAnimation } from '../styles/animation';
//MUI components
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: 'red',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    color: 'white',
    backgroundColor: 'red',
    '&:hover': {
      transition: '0.2s',
      backgroundColor: '#c01717',
    }
  },
}));

const SignIn = () => {

  const classes = useStyles();
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  const isLogged = useSelector(state => state.user.isLogged);

  const history = useHistory();
  const dispatch = useDispatch();

  const handleEmailInput = (e) => {
    setEmailInput(e.target.value);
  }

  const handlePasswordInput = (e) => {
    setPasswordInput(e.target.value);
  }

  const handleSignInSubmit = (e) => {
    e.preventDefault();
    dispatch(signIn(emailInput, passwordInput));
    history.goBack();
  }

  return (
    <>
      <Loader />
      <StyledMotionDiv
        variants={pageAnimation}
        initial="hidden"
        animate="show"
        exit="exit"
      >
        <Container className={classes.root} component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form
              className={classes.form}
              noValidate
              onSubmit={handleSignInSubmit}
            >
              <CustomTextField
                id="email"
                label="Email Address"
                autoComplete="email"
                autoFocus={true}
                required={true}
                onChange={handleEmailInput}
              />
              <CustomTextField
                id="password"
                label="Password"
                autoComplete="current-password"
                type="password"
                required={true}
                onChange={handlePasswordInput}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
              </Button>
              <StyledLink to="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </StyledLink>
            </form>
          </div>
        </Container>
      </StyledMotionDiv>
    </>
  );
}

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
`;

export default SignIn;
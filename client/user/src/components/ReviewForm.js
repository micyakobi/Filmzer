import React, { useState } from 'react';
//Axios
import axios from 'axios';
import { reviewsURL } from '../api/reviews';
//Redux 
import { useSelector } from 'react-redux';
//Styles
import styled from 'styled-components';
//Components
import CustomTextField from '../components/ui-elements/CustomTextField';
//MUI Components
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { motion } from 'framer-motion';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
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

const ReviewForm = ({ movieId, currentMovieReviews, setCurrentMovieReviews }) => {

  const classes = useStyles();
  const [titleInput, setTitleInput] = useState("");
  const [ratingInput, setRatingInput] = useState("");
  const [contentInput, setContentInput] = useState("");

  const userLogged = useSelector(state => state.user.user);

  const handleTitleInput = (e) => {
    setTitleInput(e.target.value);
  }

  const handleRatingInput = (e) => {
    setRatingInput(e.target.value);
  }

  const handleContentInput = (e) => {
    setContentInput(e.target.value);
  }

  const handleSubmitReview = (e) => {
    e.preventDefault();
    axios.post(
      reviewsURL(),
      {
        reviewTitle: titleInput,
        rating: ratingInput,
        reviewContent: contentInput,
        movies: { _id: movieId },
        users: { _id: userLogged._id },
      })
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        delete data["users"];
        data["user"] = userLogged;
        setCurrentMovieReviews([data].concat(currentMovieReviews))
      })
    setTitleInput("");
    setRatingInput("");
    setContentInput("");
  }

  return (
    <StyledContainer>
      <Container component="main">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            POST A REVIEW
        </Typography>
          <form
            className={classes.form}
            noValidate
            onSubmit={handleSubmitReview}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <CustomTextField
                  id="title"
                  label="Review Title"
                  onChange={handleTitleInput}
                  value={titleInput}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomTextField
                  id="rating"
                  label="Rating"
                  onChange={handleRatingInput}
                  value={ratingInput}
                />
              </Grid>
              <Grid item xs={12}>
                <CustomTextField
                  id="reviewContent"
                  label="Write a Review..."
                  onChange={handleContentInput}
                  value={contentInput}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={classes.submit}
            >
              SUBMIT
          </Button>
          </form>
        </div>
      </Container>
    </StyledContainer>
  );
}

const StyledContainer = styled(motion.div)`
    
    width: 100%;
    min-width: 200px;
    padding: 0.5rem 0 3rem 0;
    margin: 4rem 0;
    background-color: #141414;
    border-radius: 5px;
`;

export default ReviewForm;
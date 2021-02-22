import React, { useEffect, useState } from 'react';
//Redux
import { useSelector, useDispatch } from 'react-redux';
import { loadTopMovies } from '../redux/actions/moviesActions'
import { loadTopLatestReviews } from '../redux/actions/reviewsActions';
//Styles
import { StyledMotionDiv } from '../styles/styles';
//Animation
import { pageAnimation } from '../styles/animation';
//Components
import Loader from '../components/Loader';
import MainVideoSlider from '../components/MainVideoSlider';
import ReviewsSlider from '../components/ReviewsSlider';

const Home = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadTopMovies(5));
    dispatch(loadTopLatestReviews(10));
  }, [dispatch])

  const topMovies = useSelector(state => state.movies.topMovies);
  const topLatestReviews = useSelector(state => state.reviews.topLatestReviews);

  return (
    <>
      <Loader />
      <StyledMotionDiv
        variants={pageAnimation}
        initial="hidden"
        animate="show"
        exit="exit"
      >
        <MainVideoSlider topMovies={topMovies} />
        <ReviewsSlider sliderTitle="LATEST REVIEWS" topLatestReviews={topLatestReviews} />

      </StyledMotionDiv>
    </>
  );
}

export default Home;
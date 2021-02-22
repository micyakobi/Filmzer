import React, { useEffect, useState } from 'react';
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { loadAllReviews, loadSearchedReviews } from '../redux/actions/reviewsActions';
import { loadAllMovies } from '../redux/actions/moviesActions';
//Styles
import { StyledMotionDiv } from '../styles/styles';
import styled from 'styled-components';
//Routing
import { Link } from 'react-router-dom';
//Components
import Loader from '../components/Loader';
import ReviewCard from '../components/ReviewCard';
import SearchInput from '../components/ui-elements/SearchInput';
//Animation 
import { pageAnimationFromBottom } from '../styles/animation';
import { motion } from 'framer-motion';

const Reviews = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadAllReviews());
    dispatch(loadAllMovies());
  }, [dispatch]);

  const searchedReviews = useSelector(state => state.reviews.searchedReviews);

  const [titleInput, setTitleInput] = useState("");
  const [ratingInput, setRatingInput] = useState("");
  const [usernameInput, setUsernameInput] = useState("");

  const handleTitleInput = (e) => {
    setTitleInput(e.target.value)
  };

  const handleRatingInput = (e) => {
    setRatingInput(e.target.value)
  };

  const handleUsernameInput = (e) => {
    setUsernameInput(e.target.value)
  };

  useEffect(() => {
    dispatch(loadSearchedReviews(titleInput, ratingInput, usernameInput));
  }, [titleInput, ratingInput, usernameInput])

  return (
    <>
      <Loader />
      <StyledMotionDiv
        variants={pageAnimationFromBottom}
        initial="hidden"
        animate="show"
        exit="exit"
      >
        <StyledSearchDiv>
          <SearchInput placeholder="Title..." onChange={handleTitleInput} />
          <SearchInput placeholder="Rating..." onChange={handleRatingInput} />
          <SearchInput placeholder="Author..." onChange={handleUsernameInput} />
        </StyledSearchDiv>
        <ReviewsGrid>
          {searchedReviews.map((review) => (
            <StyledLink to={`/movies/${review.movie._id}`}>
              <ReviewCard review={review} key={review._id} />
            </StyledLink>
          ))}
        </ReviewsGrid>
      </StyledMotionDiv>
    </>
  );
}

const ReviewsGrid = styled(motion.div)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  margin-left: 1rem;
  grid-column-gap: 3rem;
  grid-row-gap: 4rem;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const StyledSearchDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #141414;
  padding: 3rem;
  margin-bottom: 2rem;
`;

export default Reviews;
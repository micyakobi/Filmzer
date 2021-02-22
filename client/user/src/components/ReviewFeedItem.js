import React from 'react';
//Reudx 
import { useSelector } from 'react-redux';
//Styles
import styled from 'styled-components';
import { StyledButton } from '../styles/styles';
//Animation
import { motion } from 'framer-motion';
//MUI Icons
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
//Utils
import { fixedRating } from '../utils/utils';

const ReviewFeedItem = ({ review, onDeleteClick }) => {

  const user = useSelector(state => state.user.user);

  if (!review) {
    return "";
  }

  const handleDeleteClick = (reviewId) => {
    onDeleteClick(reviewId);
  };

  const renderDeleteButton = () => {
    if (user._id === review.user._id) {
      return (
        <StyledDeleteDiv onClick={() => handleDeleteClick(review._id)}>
          <h4>Delete</h4>
          <HighlightOffIcon />
        </StyledDeleteDiv>
      )
    }
  };

  return (
    <>
      {review.user && (
        <StyledContainer>
          <StyledReviewHeader>
            <StyledHeaderContainer>
              <motion.div>
                <motion.h1>{review.reviewTitle}</motion.h1>
                <StyledRatingDiv>
                  {`${fixedRating(review.rating)}/10`}
                </StyledRatingDiv>
              </motion.div>
              {renderDeleteButton()}
            </StyledHeaderContainer>
            <motion.h5>{`By ${review.user.username}`}</motion.h5>
          </StyledReviewHeader>
          <StyledReviewContent>
            <motion.p>{review.reviewContent}</motion.p>
          </StyledReviewContent>
        </StyledContainer>
      )}
    </>
  );
}

const StyledContainer = styled(motion.div)`
        
    width: 100%;
    min-width: 200px;
    padding: 2rem;
    margin: 2rem 0;
    background-color: #141414;
    border-radius: 5px;
`;

const StyledReviewHeader = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  div {
    display: flex;
  }
  h5 {
    color: red;
    font-weight: lighter;
    letter-spacing: 0.1rem;
    margin-top: 0.5rem;
  }
`;

const StyledReviewContent = styled(motion.div)`
  display: flex;
  text-align: left;
  p {
    font-size: 1rem;
  }
`;

const StyledRatingDiv = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.2rem 1rem;
  margin-left: 1.5rem;
  background-color: red;
  border-radius: 10px;
  font-weight: bold;
  font-size: 1.2rem;
`;

const StyledHeaderContainer = styled(motion.div)`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const StyledDeleteDiv = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #181818;
  border-radius: 0.5rem;
  padding: 0rem 1rem;

  h4 {
    margin-right: 0.5rem;
    letter-spacing: 0.1rem;
  }
  &:hover {
    transition: 0.5s;
    color: red;
    cursor: pointer;
  }
`;

export default ReviewFeedItem;
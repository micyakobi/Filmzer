import React from "react";
//Routing
import { Link } from 'react-router-dom';
//Styles
import styled from 'styled-components';
//Splide carousel
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';
//Animation
import { motion } from 'framer-motion';
//MUI components
import { Button } from "@material-ui/core";
//Utils
import { fixedRating } from '../utils/utils';

const options = {
  type: 'loop',
  gap: '1rem',
  drag: true,
  autoplay: true,
  interval: 3000,
  pauseOnHover: true,
  resetProgress: false,
  arrows: 'slider',
};

const MainVideoSlider = ({ topMovies }) => {

  return (

    <StyledSplideSlider
      options={options}
    >
      {topMovies && (
        topMovies.map(movie => (
          <SplideSlide key={movie._id}>
            <StyledDiv>
              <StyledSliderDataDiv>
                <motion.h1>
                  {movie.title.toUpperCase()}
                </motion.h1>
                <StyledBlockDiv>
                  <StyledGrayDiv>
                    {movie.year}
                  </StyledGrayDiv>
                  <StyledGrayDiv>
                    {movie.genre}
                  </StyledGrayDiv>
                  <StyledGrayDiv>
                    {`${fixedRating(movie.rating_avg)}/10`}
                  </StyledGrayDiv>
                </StyledBlockDiv>
                <StyledDescription>
                  <motion.p>
                    {`${movie.description.replace(/^(.{120}[^\s]*).*/, "$1")}...`}
                  </motion.p>
                </StyledDescription>
                <StyledButton component={Link} to={`/movies/${movie._id}`} variant="contained" size="large">
                  READ MORE
              </StyledButton>
              </StyledSliderDataDiv>
              <img src={movie.image_url} alt={movie.title} />
            </StyledDiv>
          </SplideSlide>
        )))}
    </StyledSplideSlider>
  );
}

const StyledSplideSlider = styled(Splide)`
  margin-bottom: 2rem;
  border-radius: 0.5rem;
  overflow: hidden;
`;

const StyledDiv = styled(motion.div)`
  position: relative;
  width: 100%;
  img {
    width: 100%;
    height: 50vh;
    object-fit: cover;
    object-position: top;
  }
`;

const StyledSliderDataDiv = styled(motion.div)`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  padding: 2.5rem;
  padding-left: 5rem;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgb(255,255,255);
  background: linear-gradient(270deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 18%, rgba(0,0,0,1) 100%);

  h1 {
    font-size: 3rem;
  }
`;

const StyledBlockDiv = styled(motion.div)`
  display: flex;
`;

const StyledGrayDiv = styled(motion.div)`
    padding: 0.5rem 0.7rem;
    margin: 0.5rem 1rem 0.5rem 0;
    background-color: #141414;
    border-radius: 5px;
    font-size: 0.8rem;
`;

const StyledDescription = styled(motion.div)`
  display: flex;
  justify-content: flex-start;
  align-items: center; 

  p {
    font-weight: lighter;
    margin: 0.5rem 0;
    text-align: left;
    max-width: 40%;
    font-size: 0.8rem;
    line-height: 1.2rem;
  }
`;

const StyledButton = styled(Button)`
  &.MuiButton-root	 {
    margin-top: 0.5rem;
    background-color: red;
    color: white;

    &:hover {
      transition: 0.5s;
      background-color: #b90000;
    }
  }
`;

export default MainVideoSlider;
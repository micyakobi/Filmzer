import React from 'react';
//Styles
import styled from 'styled-components';
//Animation
import { motion } from 'framer-motion';
//emblem
import Emblem from '../images/emblem.png'

const AboutUsSection = () => {

  return (
    <StyledAboutUsDiv>
      <StyledDescription>
        <motion.h1>
          WE TAKE REVIEWS
        </motion.h1>
        <motion.h1>
          <span>VERY</span> SERIOUSLY.
        </motion.h1>
        <motion.p>
          Filmzer is the world’s most trusted recommendation resource for quality entertainment.<br />
          As the leading online website of movie reviews we provide fans with a comprehensive guide to<br />
          what’s Fresh – and what’s Rotten – in theaters and at home. If you’re an entertainment fan<br />
          looking for a recommendation, or to share an opinion, you’ve come to the right place.<br />
        </motion.p>
      </StyledDescription>
      <StyledLogoDiv>
        <img src={Emblem} alt="emblem" />
      </StyledLogoDiv>
    </StyledAboutUsDiv>
  );
}

const StyledAboutUsDiv = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  min-height: 50vh;
  padding: 1rem;
`;

const StyledDescription = styled(motion.div)`

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  h1 {
    font-size: 4rem;
  }
  span {
    color: red;
  }
  p {
    margin: 1rem;
    font-size: 0.8rem;
    font-weight: lighter;
    text-align: left;
    line-height: 1.5rem;
  }
`;

const StyledLogoDiv = styled(motion.div)`
  width: 500px;
  height: 250px;
  margin-right: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 80%;
  }
`;

export default AboutUsSection;
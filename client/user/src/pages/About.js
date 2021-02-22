import React from 'react';
//Styles
import { StyledMotionDiv } from '../styles/styles';
import styled from 'styled-components';
//Components
import Loader from '../components/Loader';
import AboutUsSection from '../components/AboutUsSection';
import TeamSection from '../components/TeamSection';
//Animation 
import { pageAnimationFromLeft } from '../styles/animation';
import { motion } from 'framer-motion';

const About = () => {

  return (
    <>
      <Loader />
      <StyledMotionDiv
        variants={pageAnimationFromLeft}
        initial="hidden"
        animate="show"
        exit="exit"
      >
        <StyledDiv>
          <AboutUsSection />
          <TeamSection />
        </StyledDiv>
      </StyledMotionDiv>
    </>
  );
}

const StyledDiv = styled(motion.div)`
  display: flex;
  flex-direction: column;
`;

export default About;
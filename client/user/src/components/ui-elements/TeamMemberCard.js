import { motion } from "framer-motion";
import React from "react";
//styles
import styled from 'styled-components';

const TeamMemberCard = ({ name, role, image }) => {

  return (
    <StyledMemberDiv>
      <StyledContent>
        <motion.img src={image} alt={name} />
        <motion.div>
          <motion.h2>{name}</motion.h2>
          <motion.h3>{role}</motion.h3>
        </motion.div>
      </StyledContent>
    </StyledMemberDiv>
  );
}

const StyledMemberDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 0;
  max-width: 30%;
  min-width: 380px;

  background-color: #141414;
  margin: 1rem;
  border-radius: 1rem;

  transition: transform .2s;
  &:hover {
      transform: scale(1.05);
  }

  img {
    width: 20%;
    margin-right: 2rem;
  }

  h2 {
    font-weight: lighter;
    letter-spacing: 0.5rem;
    margin-bottom: 0.5rem;
    font-size: 1rem;
  }

  h3 {
    letter-spacing: 0.2rem;
  }
`;

const StyledContent = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 2rem;
`;

export default TeamMemberCard;

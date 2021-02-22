import React from 'react';
//Styles
import styled from 'styled-components';
//Components
import TeamMemberCard from '../components/ui-elements/TeamMemberCard';
//Team pictures
import teamPictureLee from '../images/teamPictureLee.png';
import teamPictureDaniel from '../images/teamPictureDaniel.png';
import teamPictureMichael from '../images/teamPictureMichael.png';
//Animation
import { motion } from 'framer-motion';

const TeamSection = () => {

  return (
    <StyledTeamDiv>
      <TeamMemberCard
        name="Lee Lavy"
        role="CEO"
        image={teamPictureLee}
      >
      </TeamMemberCard>
      <TeamMemberCard
        name="Daniel Gutman"
        role="Project Manager"
        image={teamPictureDaniel}
      >
      </TeamMemberCard>
      <TeamMemberCard
        name="Michael Yakobi"
        role="Movies Overlord"
        image={teamPictureMichael}
      >
      </TeamMemberCard>
    </StyledTeamDiv>
  );
}

const StyledTeamDiv = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 1rem;
`;

export default TeamSection;
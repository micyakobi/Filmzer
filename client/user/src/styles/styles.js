import styled from 'styled-components';
import { motion } from 'framer-motion';
//MUI components
import Button from '@material-ui/core/Button';

//styled components

export const StyledMotionDiv = styled(motion.div)`
  width: 80%;
  padding: 2rem;
`;

export const StyledButton = styled(Button)`
  &:hover {
    transition: 0.5s;
    color: red;
  }
`;
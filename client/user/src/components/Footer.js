import React from 'react';
//Styles
import styled from 'styled-components';
//Routing
import { Link } from 'react-router-dom';
//MUI Components
import Button from '@material-ui/core/Button';

const Footer = () => {

  return (
    <>
      <StyledFooter>
        <StyledBottomNav>
          <ul>
            <li><StyledButton component={Link} to={'/movies'} color="inherit">MOVIES</StyledButton></li>
            <li><StyledButton component={Link} to={'/reviews'} color="inherit">REVIEWS</StyledButton></li>
            <li><StyledButton component={Link} to={'/about'} color="inherit">ABOUT</StyledButton></li>
          </ul>
        </StyledBottomNav>
        <StyledCopyRights>
          <h6>FILMZER - 2020 All Rights Reserved</h6>
        </StyledCopyRights>
      </StyledFooter>
    </>
  );
}

const StyledFooter = styled.footer`
  width: 100%;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  ul {
    display: flex;
    justify-content: center;
    align-items: center;
    list-style: none;
    width: 20%;
  }
  li {
    font-weight: bold;
    font-size: 0.8rem;
    margin: 1rem;
  }
`;

const StyledBottomNav = styled.div`
  background: #141414;
  color: white;
  min-height: 10%;
  padding: 1rem;
`;

const StyledCopyRights = styled.div`
  background: #1B1B1B;
  color: #aaaaaa;
  min-height: 10%;
  padding: 1rem;
  font-size: 0.8rem;
`;

const StyledButton = styled(Button)`
  &:hover {
    transition: 0.5s;
    color: red;
  }
`;

export default Footer;
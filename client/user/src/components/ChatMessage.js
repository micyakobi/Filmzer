import React from 'react';
//Redux
import { useSelector } from 'react-redux';
//Styles
import styled from 'styled-components';

const ChatMessage = ({ userName, message }) => {

  const userLogged = useSelector(state => state.user.user.username);

  const isUser = (userLogged === userName);

  return (
    <StyledMessageContainer>
      <StyledUserMessageDiv isUser={isUser} >
        <h3>{userName}: </h3> <span>{message}</span>
      </StyledUserMessageDiv>
    </StyledMessageContainer>
  );
}

const StyledMessageContainer = styled.div`
  display: block;
  margin-bottom: 0.5rem;
`;

const StyledUserMessageDiv = styled.div`
  display: inline-flex;
  align-items: flex-end;
  background: ${props => props.isUser ? "#e07f7f" : "#f0bcbc"};
  color: ${props => props.isUser ? "#4b2323" : "#000000"};
  padding: 0.2rem 0.5rem;
  border-radius: 0 10px 10px 10px;

  h3 {
    font-weight: bold;
  }
  span {
    margin-left: 0.3rem;
  }

`;


export default ChatMessage;
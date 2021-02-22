import React, { useState, useEffect, useRef } from 'react';
//Redux
import { useSelector } from 'react-redux';
//Styles
import styled from 'styled-components';
//MUI Components
import CustomTextField from './ui-elements/CustomTextField';
import { Button } from "@material-ui/core";
//Socket
import { subscribeToChat, sendMessage } from '../socket';
//Components
import ChatMessage from './ChatMessage';

const Chat = () => {

  const userName = useSelector(state => state.user.user.username);
  const [messageInput, setMessageInput] = useState('');
  const [chat, setChat] = useState([]);

  useEffect(() => {
    subscribeToChat((err, data) => {
      if (err) return;
      setChat(oldChats => [...oldChats, data])
    });

  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [chat]);

  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleMessageInputChange = (e) => {
    setMessageInput(e.target.value);
  }

  const handleSendClick = () => {
    if (messageInput.length) {
      sendMessage(userName, messageInput);
      setMessageInput('');
    }
  }

  return (
    <StyledChatContainer>
      <ChatSpace>
        {chat.map((item) => (
          <ChatMessage userName={item.user} message={item.message} />
        ))}
        <div ref={messagesEndRef} />
      </ChatSpace>
      <MessageBar>
        <StyledTextContainer>
          <CustomTextField
            id="standard-basic"
            label="Message..."
            autoComplete="false"
            autoFocus="false"
            fullWidth
            onChange={handleMessageInputChange}
            value={messageInput}
          />
        </StyledTextContainer>
        <StyledButtonContainer>
          <StyledButton
            variant="contained"
            size="large"
            fullWidth
            onClick={handleSendClick}
          >
            SEND
        </StyledButton>
        </StyledButtonContainer>
      </MessageBar>
    </StyledChatContainer>
  );
}

const StyledChatContainer = styled.div`
  min-width: 300px;
  min-height: 200px;
  width: 40%;
  height: 40vh;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 1px 0px 50px -3px rgba(0,0,0,0.78);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #1b1b1b;
`;

const ChatSpace = styled.div`
  overflow-y: auto;
  display: block;
  padding: 2rem;
  width: 100%;
  height: 100%;
  background: #252525;

  &::-webkit-scrollbar{
      width: 0.5rem;
    }
    &::-webkit-scrollbar-thumb{
      background-color: #4e4e4e;
    }
    &::-webkit-scrollbar-track{
      background-color: #302e2e;
    }
`;

const MessageBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  bottom: 1rem;
  padding: 1rem 1rem;
  width: 100%;
`;

const StyledTextContainer = styled.div`
  width: 75%;
`;

const StyledButtonContainer = styled.div`
  width: 20%;
`;

const StyledButton = styled(Button)`
  &.MuiButton-root	 {
    margin-top: 0.5rem;
    background-color: red;
    color: white;
    padding: 1rem 0;

    &:hover {
      transition: 0.5s;
      background-color: #b90000;
    }
  }
`;

export default Chat;
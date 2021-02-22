import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  html {
    &::-webkit-scrollbar{
      width: 0.5rem;
    }
    &::-webkit-scrollbar-thumb{
      background-color: #4e4e4e;
    }
    &::-webkit-scrollbar-track{
      background-color: white;
    }
  }

  body {
    font-family: 'Roboto', sans-serif;
    letter-spacing: 0.1rem;
    background: #141414;
  }
`;

export default GlobalStyles;
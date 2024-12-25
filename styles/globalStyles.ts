'use client';

import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Roboto', 'Open Sans', sans-serif;
    background-color: #F8F9FA; /* 중립색 */
    color: #333; /* 기본 텍스트 색상 */
  }

  * {
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    font-family: inherit;
    cursor: pointer;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  input, textarea {
    font-family: inherit;
  }
`;

export default GlobalStyles;

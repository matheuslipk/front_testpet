import {createGlobalStyle} from 'styled-components'

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    height: 100%;
    background: #00000005;
  }

  a {
    text-decoration: none;
  }

  ul {
    list-style: none;
  }

`;
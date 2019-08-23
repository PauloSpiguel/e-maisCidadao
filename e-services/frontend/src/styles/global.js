// ############## COMPARTILHAMENTO GLOBAL DO CSS ##############################

import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body, html, #root{
    min-height: 100%;
  }

  body{
    -webkit-font-smoothing: antialiased !important;
    background: #fafafa;
    font-family: Arial, Helvetica, sans-serif;
    color: #333
  }

  body, input, button{
    color: #222;
    font-size: 14px;
    font-family: Arial, Helvetica, sans-serif;
  }

  button{
    cursor: pointer
  }
`;

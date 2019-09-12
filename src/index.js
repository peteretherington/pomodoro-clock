import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { darken } from "polished";

import Pomodoro from "./components/Pomodoro";

// ========================================
// APP
// ========================================

const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Wrapper>
          <GlobalStyle />
          <Pomodoro />
        </Wrapper>
      </ThemeProvider>
    </>
  );
};

// ========================================
// STYLES
// ========================================

const theme = {
  typed: "Roboto",
  written: "Yellowtail",
  white: "#fff",
  black: "#000",
  primary: "dodgerblue",
  secondary: "yellow",
  tsNumber: `0 1px 1px yellow`,
  tsScreen: `0 1px 10px yellow`,
  confirm: "#12bc00",
  reject: "#d60606",
  warn: "#ccc100",
  br: "4px"
};

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Yellowtail|Roboto:400,700');

  * {
    box-sizing: border-box;
  }

  .hidden {
    visibility: hidden;
    position: absolute;
    left: -99999px;
    top: -99999px;
    width: 0;
    height: 0;
  }

  input[type="number"] {
    cursor: pointer;
  }

  input[type="number"]:focus {
    box-shadow: ${props => `inset 0px 0px 8px 1px ${props.theme.secondary}`};
  }

  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .button {
    border: none;
    border-radius: ${props => props.theme.br};
    text-transform: uppercase;
    font-family: ${props => props.theme.typed};
    font-size: 1rem;
    font-weight: bold;
    letter-spacing: 1px;
    cursor: pointer;
    padding: 7px 10px;
    background: ${props => props.theme.secondary};
    color: ${props => props.theme.black};
    transition: all 100ms ease, color 200ms ease;

    &:hover {
      background: ${props => darken(0.1, props.theme.primary)};
      color: ${props => props.theme.white};
    }

    &:focus {
      outline: none;
      box-shadow: none;
    }
  }

  h1 {
    font-family: ${props => props.theme.written};
    font-size: 3rem;
    letter-spacing: 1px;
    color: ${props => props.theme.black};
    text-shadow: 0px 0px 15px #aaa;
    box-shadow: inset 0px 0px 15px -1px #aaa;
    background-color: ${props => props.theme.secondary};
    border-radius: ${props => props.theme.br};
    padding: 15px 10px 15px 0;
    margin: 0 0 10px;
    @media (max-width: 350px) {
      font-size: 2rem;
      padding: 5px 10px 5px 0;
    }
  }
`;

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  font-family: ${props => props.theme.typed};
  background-color: black;
  color: ${props => props.theme.secondary};
`;

// ========================================
// RENDER
// ========================================

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

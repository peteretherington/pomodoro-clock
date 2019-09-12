import React from "react";
import styled from "styled-components";
import { darken } from "polished";

// ========================================
// TIMER LENGTH
// ========================================

const TimerLength = props => {
  return (
    <Wrapper>
      <div id={`${props.type}-cntr`} className="timer-controls--cntr">
        <div id={`${props.type}-label`} className="timer-controls--label">
          <h3>
            {props.type} <span className="hidden">Length</span>
          </h3>
        </div>
        <div className="inline-controls">
          <button
            id={`${props.type}-decrement`}
            className="button timer-controls--decrement"
            onClick={props.handleClick}
            value={props.type}
          >
            -
          </button>
          <input
            id={`${props.type}-length`}
            className="timer-controls--length"
            name={props.type}
            value={props.time}
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            type="number"
          />
          <button
            id={`${props.type}-increment`}
            className="button timer-controls--increment"
            onClick={props.handleClick}
            value={props.type}
          >
            +
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

export default TimerLength;

// ========================================
// STYLES
// ========================================

const Wrapper = styled.div`
  .timer-controls--cntr {
    .inline-controls > * {
      height: 40px;
      vertical-align: middle;
      margin-top: 5px;
    }

    input {
      width: 37.5%;
      font-family: ${props => props.theme.typed};
      background: ${props => darken(0.2, props.theme.secondary)};
      text-shadow: ${props => props.theme.tsNumber};
    }

    .button {
      width: 27.5%;
      height: 40px;
      border: 2px solid transparent;
      &:hover {
        border-color: ${props => props.theme.secondary};
      }
    }

    .button:first-of-type {
      border-radius: ${props => `${props.theme.br} 0 0 ${props.theme.br}`};
    }
    .button:last-of-type {
      border-radius: ${props => `0 ${props.theme.br} ${props.theme.br} 0`};
    }
  }

  .timer-controls--label {
    font-family: ${props => props.theme.written};
    font-size: 1.25rem;
    letter-spacing: 1px;
    color: ${props => props.theme.primary};
    text-transform: capitalize;
    padding-bottom: 5px;
    margin: 0 0 10px;
    border-bottom: ${props => `1px solid ${props.theme.primary}`};

    h3 {
      margin: 0;
    }
  }

  .timer-controls--length {
    font-weight: bold;
    font-size: 1.5rem;
    text-align: center;
    border-top: ${props => `2px double ${props.theme.secondary}`};
    border-bottom: ${props => `2px double ${props.theme.secondary}`};
  }
`;

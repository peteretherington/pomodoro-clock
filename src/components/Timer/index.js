import React from "react";
import styled from "styled-components";
import { lighten, darken } from "polished";

// ========================================
// TIMER
// ========================================

const Timer = props => {
  let minutes = Math.floor(props.timer.length / 60);
  let seconds = props.timer.length % 60;
  minutes = minutes > 9 ? minutes : `0${minutes}`;
  seconds = seconds > 9 ? seconds : `0${seconds}`;
  let time = minutes === 60 ? `1:00:00` : `${minutes}:${seconds}`;

  return (
    <Wrapper>
      <div className="timer-cntr">
        <div id="timer-label">
          <h3>
            {props.timer.type} #
            {props.timer.type === "session"
              ? props.timer.sessionCount
              : props.timer.breakCount}
          </h3>
          <p>
            {props.timer.active && props.timer.type === "session"
              ? "Until we can manage time, we can manage nothing else."
              : props.timer.active && props.timer.type === "break"
              ? "The time to relax is when you don't have time for it."
              : "Click START to begin."}
          </p>
        </div>
        <div
          id="time-left"
          className={props.timer.active ? "active" : "inactive"}
        >
          {time}
        </div>
        <div className="inline-buttons">
          <button
            id="start_stop"
            className={props.timer.active ? "active button" : "button"}
            onClick={props.startStopTimer}
          >
            {props.timer.active ? "Pause" : "Start"}
          </button>
          <button id="reset" className="button" onClick={props.resetTimer}>
            {props.fullReset ? "Full Reset" : "Reset"}
          </button>
        </div>
        <audio
          id="beep"
          src="http://soundbible.com/mp3/Metal_Gong-Dianakc-109711828.mp3"
          preload="auto"
        />
      </div>
    </Wrapper>
  );
};

export default Timer;

// ========================================
// STYLES
// ========================================

const Wrapper = styled.div`
  .timer-cntr {
    display: flex;
    flex-direction: column;
    padding: 10px 0 0;
    margin: 0 auto;

    .inline-buttons {
      display: flex;
      justify-content: space-between;
      background: ${props => darken(0.3, props.theme.secondary)};
      border: ${props => `1px solid ${props.theme.secondary}`};
      border-radius: ${props => props.theme.br};
      margin-top: 15px;
    }

    .button {
      padding: 14px 0;

      @media (max-width: 320px) {
        font-size: 0.8rem;
      }
    }

    .button:first-of-type {
      background: ${props => darken(0.05, props.theme.confirm)};
      &:hover {
        background: ${props => props.theme.confirm};
      }
      width: 60%;
    }

    .button:last-of-type {
      background: ${props => darken(0.05, props.theme.reject)};
      &:hover {
        background: ${props => props.theme.reject};
      }
      width: 40%;
    }

    .button.active {
      background: ${props => darken(0.1, props.theme.warn)};
      &:hover {
        background: ${props => props.theme.warn};
      }
    }
  }

  #timer-label {
    color: ${props => lighten(0.1, props.theme.primary)};
    font-weight: bold;
    background: $black;
    border: ${props => `1px solid ${props.theme.secondary}`};
    border-radius: ${props => props.theme.br};
    padding: 5px 0 10px;
    margin: 5px 0 0;

    h3 {
      font-size: 1.25rem;
      font-family: ${props => props.theme.written};
      letter-spacing: 1px;
      text-transform: capitalize;
      margin: 0;
      padding: 2.5px 0 10px;
      position: relative;

      &:before {
        content: "";
        position: absolute;
        left: 50%;
        bottom: 0;
        transform: translateX(-50%);
        width: 100%;
        border-bottom: ${props => `1px dashed ${props.theme.primary}`};
      }
    }

    p {
      font-size: 0.75rem;
      margin: 5px 0 0;
      padding: 5px 10px 0;
      line-height: 1.5;
    }
  }

  #time-left {
    font-family: ${props => props.theme.typed};
    font-size: 5rem;
    letter-spacing: 1px;
    text-shadow: ${props => props.theme.tsScreen};
    background: ${props => props.theme.black};
    border: ${props => `1px solid ${props.theme.secondary}`};
    border-radius: ${props => props.theme.br};
    padding: 10px 0;
    margin: 15px 0 0;
    transition: all 400ms ease;

    @media (max-width: 320px) {
      font-size: 4rem;
    }

    &.active {
      color: ${props => props.theme.white};
      background: ${props => darken(0.25, props.theme.secondary)};
    }
  }
`;

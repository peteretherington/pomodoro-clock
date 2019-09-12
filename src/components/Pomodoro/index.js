import React from "react";
import styled from "styled-components";

import TimerLength from "../TimerLength";
import Timer from "../Timer";

// ========================================
// POMODORO
// ========================================

// CONFIG
const timerDefaults = {
  max: 60, // Max timer length
  min: 1, // Min timer length
  session: 25, // Default session timer length
  break: 5 // Default break timer length
};

class Pomodoro extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      timer: {
        type: "session",
        active: false,
        length: timerDefaults.session * 60,
        sessionCount: 1,
        breakCount: 1
      },
      session: timerDefaults.session,
      break: timerDefaults.break,
      fullReset: false
    };
  }

  componentDidUpdate = () => {
    let length = this.state.timer.length,
      type = this.state.timer.type,
      fullReset = this.state.fullReset,
      timesUp = length === -1,
      beep = document.getElementById("beep");

    let conditionForFullReset =
      length === this.state[type] * 60 && !this.state.timer.active; // Timer is at max // Timer is inactive

    if (fullReset !== conditionForFullReset)
      this.setState({ fullReset: !fullReset });

    if (timesUp && type === "session") {
      this.setState(state => ({
        timer: {
          ...state.timer,
          type: "break",
          length: parseInt(state.break, 10) * 60,
          sessionCount: state.timer.sessionCount + 1
        }
      }));
    }

    if (timesUp && type === "break") {
      this.setState(state => ({
        timer: {
          ...state.timer,
          type: "session",
          length: parseInt(state.session, 10) * 60,
          breakCount: state.timer.breakCount + 1
        }
      }));
    }

    if (length === 0) {
      beep.currentTime = 0;
      beep.play();
    }
  };

  handleChange = e => {
    const type = e.target.name;
    let val = e.target.value;
    val =
      parseInt(val, 10) > 99
        ? timerDefaults.max
        : parseInt(val, 10) < 0
        ? timerDefaults.min
        : val;

    this.setState({ [type]: val });

    if (
      typeof val === "string" &&
      parseInt(val, 10) > 0 &&
      parseInt(val, 10) < 100
    ) {
      this.updateTimer(type);
    }
  };

  handleBlur = e => {
    const type = e.target.name;
    let val = e.target.value;
    val =
      val > timerDefaults.max
        ? timerDefaults.max
        : val < timerDefaults.min
        ? timerDefaults.min
        : val;

    this.setState({ [type]: val });
    this.updateTimer(type);
  };

  handleTimerControlButton = e => {
    const type = e.target.value,
      add = e.target.className.includes("increment");

    // Determine whether the operation is adding or subtracting from previous state
    const operator = val => {
      let calc = add ? parseInt(val, 10) + 1 : parseInt(val, 10) - 1;
      let newState = add
        ? val >= timerDefaults.max
          ? timerDefaults.max
          : calc
        : val <= timerDefaults.min
        ? timerDefaults.min
        : calc;
      return newState;
    };

    this.setState(state => ({
      [type]: operator(state[type])
    }));

    this.updateTimer(type);
  };

  startStopTimer = e => {
    e.preventDefault();

    this.setState(state => ({
      timer: {
        ...state.timer,
        active: !state.timer.active
      }
    }));

    if (!this.state.timer.active) {
      this.timer = setInterval(() => {
        this.setState(state => ({
          timer: {
            ...state.timer,
            length: parseInt(state.timer.length, 10) - 1
          }
        }));
      }, 1000);
    } else {
      clearInterval(this.timer);
    }
  };

  updateTimer = timerType => {
    let timer = this.state.timer;
    let sameType = timerType === timer.type;
    let fullTimer = timer.length === this.state[timerType] * 60;
    let inactiveTimer = timer.active === false;
    if (sameType && inactiveTimer && fullTimer) {
      this.setState(state => ({
        timer: {
          ...state.timer,
          length: parseInt(state[timerType], 10) * 60
        }
      }));
    }
  };

  resetTimer = e => {
    // Reset sound effect
    let beep = document.getElementById("beep");
    beep.pause();
    beep.currentTime = 0;

    clearInterval(this.timer);

    const reset = (state, prop) => {
      const fullReset = state.fullReset;

      switch (prop) {
        case "length":
          return fullReset
            ? timerDefaults.session * 60
            : state[state.timer.type] * 60;

        case "type":
          return fullReset ? "session" : state.timer.type;

        case "session":
        case "break":
          return fullReset ? timerDefaults[prop] : state[prop];

        case "sessionCount":
        case "breakCount":
          return fullReset ? 1 : state.timer[prop];

        default:
          return null;
      }
    };

    this.setState(state => ({
      timer: {
        type: reset(state, "type"),
        active: false,
        length: reset(state, "length"),
        sessionCount: reset(state, "sessionCount"),
        breakCount: reset(state, "breakCount")
      },
      session: reset(state, "session"),
      break: reset(state, "break")
    }));
  };

  render() {
    let title = "Pomodoro Clock";
    let TimerLength_all = ["session", "break"].map(val => (
      <TimerLength
        type={val}
        time={this.state[val]}
        handleChange={this.handleChange}
        handleClick={this.handleTimerControlButton}
        handleBlur={this.handleBlur}
      />
    ));

    return (
      <Wrapper>
        <div className="pomodoro">
          <h1>{title}</h1>
          <TimerLengthAll class="timerlength-all clearfix">
            {TimerLength_all}
          </TimerLengthAll>
          <Timer
            timer={this.state.timer}
            startStopTimer={this.startStopTimer}
            resetTimer={this.resetTimer}
            fullReset={this.state.fullReset}
          />
        </div>
      </Wrapper>
    );
  }
}

export default Pomodoro;

// ========================================
// STYLES
// ========================================

const Wrapper = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 15px;
  margin: auto;
  text-align: center;
  border-radius: ${props => props.theme.br};
`;

const TimerLengthAll = styled.div`
  > * {
    position: relative;
    display: inline-block;
    max-width: 50%;

    &:first-of-type {
      &:before {
        content: "";
        height: 70px;
        position: absolute;
        top: 38px;
        right: 0;
        border-right: ${props => `1px solid ${props.theme.primary}`};
      }

      .inline-controls {
        text-align: left;
      }

      .timer-controls--label {
        padding-right: 20px;
      }
    }

    &:last-of-type {
      .inline-controls {
        text-align: right;
      }

      .timer-controls--label {
        padding-left: 5px;
      }
    }
  }
`;

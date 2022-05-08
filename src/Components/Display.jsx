import "./Styles/Display.css";
import React from "react";

function Display({ props, onClickNumber, onClickDot, backSpace }) {
  const Display = React.useRef();

  React.useEffect(() => Display.current.focus(), []);

  function onFocusDisplay() {
    Display.current.focus();
  }

  function onNumberBtnHandler(event) {
    const value = event.charCode;
    // console.log(event.charCode);
    if (value >= 48 && value <= 57) {
      onClickNumber(event.key);
    }

    if (value === 46) {
      onClickDot();
    }
  }

  function onBtnHandler(event) {
    if (event.key === "Backspace") {
      backSpace();
    }
  }
  return (
    <p
      className="display"
      tabIndex={1}
      ref={Display}
      onClick={onFocusDisplay}
      onKeyPress={onNumberBtnHandler}
      onKeyDown={onBtnHandler}
    >
      {props.content}
      {/* <span className="mosavi">=</span> */}
      <br />
      <span className="result">{props.display}</span>
    </p>
  );
}

export default Display;

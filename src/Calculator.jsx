import React from "react";
import CalcBtn from "./Components/CalcBtn";
import Display from "./Components/Display";
import NumberBtn from "./Components/NumberBtn";
import "./Calculator.css";

class Calculator extends React.Component {
  constructor() {
    super();
    this.state = {
      content: "",
      display: "0",
      lastOprator: "",
      stack: 0,
      flagOprator: false,
      flag: false,
    };

    this.onNumberBtnHandler = this.onNumberBtnHandler.bind(this);
    this.onCalucateBtnHandler = this.onCalucateBtnHandler.bind(this);
  }
  backSpace() {
    if (this.state.display.length > 1) {
      if (this.state.flag) {
        this.setState({
          content: "",
          display: this.state.display.substring(
            0,
            this.state.display.length - 1
          ),
        });
      } else {
        this.setState({
          display: this.state.display.substring(
            0,
            this.state.display.length - 1
          ),
        });
      }
    } else {
      this.setState({
        display: "0",
      });
    }
  }

  onNumberBtnHandler(value) {
    if (this.state.display.length < 15) {
      const newContent = String(Number(this.state.display + value));
      this.setState({
        display: newContent,
      });
    }
    if (this.state.flag) {
      this.setState({
        content: "",
        display: String(value),
        lastOprator: "",
        stack: 0,
        flagOprator: false,
        flag: false,
      });
    }

    if (this.state.flagOprator) {
      this.setState({
        display: String(value),
        flagOprator: false,
      });
    }
  }

  onDotBtnHandler() {
    if (this.state.display.indexOf(".") === -1) {
      this.setState({
        display: this.state.display + ".",
      });
    }
  }

  onClearBtnHandler() {
    this.setState({
      content: "",
      display: "0",
      lastOprator: "",
      stack: 0,
      flagOprator: false,
      flag: false,
    });
  }

  onDivideBtnHandler() {
    let stackHolder = null;
    if (this.state.lastOprator === "") {
      stackHolder = Number(this.state.display);
      this.setState({
        content: this.state.display + " / ",
        lastOprator: "divide",
        stack: stackHolder,
        flagOprator: true,
        flag: false,
      });
    } else {
      stackHolder = this.calcNumber();
      this.setState({
        content: this.state.content + this.state.display + " / ",
        display: String(stackHolder),
        lastOprator: "divide",
        stack: stackHolder,
        flagOprator: true,
        flag: false,
      });
    }
  }

  onMultipleBtnHandler() {
    let stackHolder = null;
    if (this.state.lastOprator === "") {
      stackHolder = Number(this.state.display);
      this.setState({
        content: Number(this.state.display) + " * ",
        lastOprator: "multiple",
        stack: stackHolder,
        flagOprator: true,
        flag: false,
      });
    } else {
      stackHolder = this.calcNumber();
      this.setState({
        content: this.state.content + this.state.display + " * ",
        display: String(stackHolder),
        lastOprator: "multiple",
        stack: stackHolder,
        flagOprator: true,
        flag: false,
      });
    }
  }

  onMinuseBtnHandler() {
    let stackHolder = null;
    if (this.state.lastOprator === "") {
      stackHolder = Number(this.state.display);
      this.setState({
        content: Number(this.state.display) + " - ",
        lastOprator: "minuse",
        stack: stackHolder,
        flagOprator: true,
        flag: false,
      });
    } else {
      stackHolder = this.calcNumber();
      this.setState({
        content: this.state.content + this.state.display + " - ",
        display: String(stackHolder),
        lastOprator: "minuse",
        stack: stackHolder,
        flagOprator: true,
        flag: false,
      });
    }
  }

  onPlusBtnHandler() {
    let stackHolder = null;
    if (this.state.lastOprator === "") {
      stackHolder = Number(this.state.display);
      this.setState({
        content: Number(this.state.display) + " + ",
        lastOprator: "plus",
        stack: stackHolder,
        flagOprator: true,
        flag: false,
      });
    } else {
      stackHolder = this.calcNumber();
      this.setState({
        content: this.state.content + this.state.display + " + ",
        display: String(stackHolder),
        lastOprator: "plus",
        stack: stackHolder,
        flagOprator: true,
        flag: false,
      });
    }
  }

  onSquareBtnHandler() {
    this.setState({
      content: "",
      display: String(Number(this.state.display) ** 2),
      flagOprator: true,
    });
  }

  onRootBtnHandler() {
    this.setState({
      content: "",
      display: String(Math.sqrt(Number(this.state.display))),
      flagOprator: true,
    });
  }

  onCalucateBtnHandler() {
    let calcNumber = this.calcNumber();
    if (this.state.display !== "0" && this.state.lastOprator !== "") {
      this.setState({
        content: this.state.content + Number(this.state.display) + " =",
        display: String(calcNumber),
        lastOprator: "",
        stack: 0,
        flagOprator: true,
        flag: true,
      });
    }
  }

  calcNumber() {
    let calcNumber = this.state.stack;

    if (this.state.lastOprator == "divide") {
      calcNumber /= Number(this.state.display);
    } else if (this.state.lastOprator == "multiple") {
      calcNumber *= Number(this.state.display);
    } else if (this.state.lastOprator == "minuse") {
      calcNumber -= Number(this.state.display);
    } else if (this.state.lastOprator == "plus") {
      calcNumber += Number(this.state.display);
    }

    return calcNumber;
  }

  render() {
    return (
      <div id="main">
        <Display
          props={this.state}
          onClickNumber={this.onNumberBtnHandler.bind(this)}
          onClickDot={this.onDotBtnHandler.bind(this)}
          backSpace={this.backSpace.bind(this)}
        />
        <div className="buttons">
          <CalcBtn value="/" onClick={this.onDivideBtnHandler.bind(this)} />
          <CalcBtn value="×" onClick={this.onMultipleBtnHandler.bind(this)} />
          <CalcBtn value="-" onClick={this.onMinuseBtnHandler.bind(this)} />
          <CalcBtn value="+" onClick={this.onPlusBtnHandler.bind(this)} />
          <NumberBtn value={7} onClick={this.onNumberBtnHandler} />
          <NumberBtn value={8} onClick={this.onNumberBtnHandler} />
          <NumberBtn value={9} onClick={this.onNumberBtnHandler} />
          <CalcBtn value="C" onClick={this.onClearBtnHandler.bind(this)} />
          <NumberBtn value={4} onClick={this.onNumberBtnHandler} />
          <NumberBtn value={5} onClick={this.onNumberBtnHandler} />
          <NumberBtn value={6} onClick={this.onNumberBtnHandler} />
          <CalcBtn value="√" onClick={this.onRootBtnHandler.bind(this)} />
          <NumberBtn value={1} onClick={this.onNumberBtnHandler} />
          <NumberBtn value={2} onClick={this.onNumberBtnHandler} />
          <NumberBtn value={3} onClick={this.onNumberBtnHandler} />
          <CalcBtn
            value={
              <i>
                x<sup>2</sup>
              </i>
            }
            onClick={this.onSquareBtnHandler.bind(this)}
          />
          <NumberBtn value={0} onClick={this.onNumberBtnHandler.bind(this)} />
          <NumberBtn value="." onClick={this.onDotBtnHandler.bind(this)} />
          <CalcBtn value="←" onClick={this.backSpace.bind(this)} />
          <CalcBtn value="=" onClick={this.onCalucateBtnHandler} />
        </div>
      </div>
    );
  }
}

export default Calculator;

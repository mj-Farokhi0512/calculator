import "./Styles/CalcBtn.css";

function CalcBtn({ value, onClick }) {
  function onClickHandler() {
    onClick();
  }

  return (
    <span className="calc-btn" onClick={onClickHandler}>
      {value}
    </span>
  );
}

export default CalcBtn;

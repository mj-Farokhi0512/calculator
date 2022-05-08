import "./Styles/NumberBtn.css";

function NumberBtn({ value, onClick }) {
  // const [value,setValue] = useState();

  function onClickHandler() {
    onClick(value);
  }

  return (
    <span className="number-btn" onClick={onClickHandler}>
      {value}
    </span>
  );
}

export default NumberBtn;

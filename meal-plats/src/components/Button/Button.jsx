import "./style.css";

const Button = ({
  text = "Button",
  loading = false,
  disabled = false,
  onClick,
  color,
  width,
}) => {
  return (
    <>
      <button
        //onClick={() => setCount(count +1)}
        class={!disabled ? "button" : "btn-disabled"}
        onClick={onClick}
        disabled={loading || disabled}
        style={{ backgroundColor: color, width: width }}
      >
        {!loading ? text : "loading..."}
      </button>
    </>
  );
};

export default Button;

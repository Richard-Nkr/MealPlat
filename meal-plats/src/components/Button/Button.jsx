import "./style.css";

const Button = ({
  text = "Button",
  loading = false,
  onClick,
  color,
  width,
}) => {
  return (
    <>
      <button
        class={loading ? "btn-disabled": "button" }
        onClick={onClick}
        style={{ backgroundColor: color, width: width }}
      >
        {!loading ? text : "Chargement..."}
      </button>
    </>
  );
};

export default Button;

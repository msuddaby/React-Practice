interface Props {
  text: string;
  color?: "primary" | "secondary" | "danger" | "success" | "info";
  onClick: () => void;
}

const Button = ({ text, color = "primary", onClick }: Props) => {
  return (
    <button type="button" className={"btn btn-" + color} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;

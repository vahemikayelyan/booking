interface Props {
  type?: ButtonType;
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

type ButtonType = "default" | "blue";

const buttonTypes: { [key in ButtonType]: string } = {
  default: "text-gray-900 bg-white border border-gray-300 hover:bg-gray-100",
  blue: "text-white bg-blue-700 hover:bg-blue-800",
};

const Button: React.FC<Props> = ({ type, className, children, onClick }) => {
  const buttonType =
    buttonTypes[type || "default"] + (className ? " " + className : "");

  return (
    <button
      onClick={onClick}
      className={`font-medium rounded-lg text-sm py-2 px-4 ${buttonType}`}
    >
      {children}
    </button>
  );
};

export default Button;

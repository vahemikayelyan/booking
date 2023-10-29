interface Props {
  type?: ButtonType;
  className?: string;
  isLoading?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
}

type ButtonType = "default" | "blue";

const buttonTypes: { [key in ButtonType]: string } = {
  default: "text-gray-900 bg-white border border-gray-300 hover:bg-gray-100",
  blue: "text-white bg-blue-700 hover:bg-blue-800 disabled:hover:bg-blue-600 disabled:bg-blue-600",
};

const Button: React.FC<Props> = ({
  type,
  className,
  isLoading,
  children,
  onClick,
}) => {
  let buttonType =
    buttonTypes[type || "default"] + (className ? " " + className : "");

  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className={`inline-flex items-center justify-center font-medium rounded-lg text-sm py-2 px-4 ${buttonType}`}
    >
      {isLoading && (
        <svg
          fill="none"
          viewBox="0 0 24 24"
          className="motion-reduce:hidden animate-spin h-5 w-5 text-white mr-2"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            strokeWidth="4"
            stroke="currentColor"
            className="opacity-25"
          ></circle>
          <path
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            fill="currentColor"
            className="opacity-75"
          ></path>
        </svg>
      )}
      {children}
      {isLoading && "..."}
    </button>
  );
};

export default Button;

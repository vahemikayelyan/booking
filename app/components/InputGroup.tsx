interface Props {
  name: string;
  type?: string;
  title?: string;
  placeholder?: string;
  autoComplete?: string;
  onClick?: () => void;
}

const InputGroup: React.FC<Props> = ({
  name,
  type,
  title,
  placeholder,
  autoComplete,
  onClick,
}) => {
  type = type || "text";
  autoComplete = autoComplete || "off";

  return (
    <div>
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {title}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputGroup;

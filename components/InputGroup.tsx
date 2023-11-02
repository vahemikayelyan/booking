interface Props {
  name: string;
  type?: string;
  title?: string;
  error?: string;
  placeholder?: string;
  autoComplete?: string;
}

const InputGroup: React.FC<Props> = ({
  name,
  type,
  title,
  error,
  placeholder,
  autoComplete,
}) => {
  type = type || "text";
  autoComplete = autoComplete || "off";

  return (
    <>
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
          placeholder={placeholder}
          autoComplete={autoComplete}
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
        />
      </div>
      {error && <small className="text-red-600">{error}</small>}
    </>
  );
};

export default InputGroup;

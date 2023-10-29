import { useEffect, useState } from "react";

interface AlertProps {
  title?: string;
  message?: string;
  className?: string;
}

function Alert({ title, message, className }: AlertProps) {
  const [display, setDisplay] = useState<boolean>(false);
  const classNameSpace = className ? className + " " : "";

  useEffect(() => {
    if (message) {
      setDisplay(true);
    }
  }, [message]);

  return (
    display && (
      <div
        role="alert"
        className={`${classNameSpace}bg-red-100 border-l-4 border-red-500 text-red-700 p-4 relative`}
      >
        {title && <p className="font-bold">{title}</p>}
        {message && <p>{message}</p>}
        <svg
          role="button"
          onClick={() => setDisplay(false)}
          className="fill-current h-6 w-6 text-red-500 absolute right-1 top-1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <title>Close</title>
          <path
            d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 
        3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 
        0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 
        1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"
          />
        </svg>
      </div>
    )
  );
}

export default Alert;

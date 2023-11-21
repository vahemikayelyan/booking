import { useState } from "react";

interface Props {
  label?: { name?: string; value?: string };
  disabled?: boolean;
  start?: number;
  end?: number;
}

function RangeSlider({ label, disabled, start = 0, end = 100 }: Props) {
  const [startValue, setStartValue] = useState(start);
  const [endValue, setEndValue] = useState(end);

  return (
    <>
      <div className="mb-2 text-gray-500">
        <span className="text-base font-normal mr-1">{label?.name}</span>
        <span className="text-sm font-semibold text-gray-900">
          {label?.value}
        </span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2.5 relative">
        {!disabled && (
          <div className="w-full bg-orange-500 rounded-full h-2.5 absolute"></div>
        )}
      </div>
    </>
  );
}

export default RangeSlider;

import { ReactElement, useCallback, useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";

interface Props {
  min: number;
  max: number;
  onChange?: (props: Props) => void;
}

const RangeSlider = ({ min, max, onChange }: Props) => {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const minValRef = useRef<HTMLInputElement>(null);
  const maxValRef = useRef<HTMLInputElement>(null);
  const range = useRef<HTMLDivElement>(null);

  // Convert to percentage
  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  function getSliderThumb(isMinThumb?: boolean): ReactElement {
    return (
      <input
        type="range"
        min={min}
        max={max}
        value={isMinThumb ? minVal : maxVal}
        ref={isMinThumb ? minValRef : maxValRef}
        onChange={(event) => {
          const targetValue = +event.target.value;
          const value = isMinThumb
            ? Math.min(targetValue, maxVal - 1)
            : Math.max(targetValue, minVal + 1);
          isMinThumb ? setMinVal(value) : setMaxVal(value);
        }}
        className={`absolute z-30 h-0 w-full outline-none appearance-none pointer-events-none ${styles.thumb}`}
      />
    );
  }

  // Set width of the range to decrease from the left side
  useEffect(() => {
    if (maxValRef.current) {
      const minPercent = getPercent(minVal);
      const maxPercent = getPercent(+maxValRef.current.value);

      if (range.current) {
        range.current.style.left = `${minPercent}%`;
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [minVal, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    if (minValRef.current) {
      const minPercent = getPercent(+minValRef.current.value);
      const maxPercent = getPercent(maxVal);

      if (range.current) {
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [maxVal, getPercent]);

  useEffect(() => {
    if (onChange) {
      onChange({ min: minVal, max: maxVal });
    }
  }, [minVal, maxVal, onChange]);

  return (
    <div className="relative">
      {getSliderThumb(true)}
      {getSliderThumb()}

      <div className="relative w-full">
        <div className="absolute h-[5px] rounded-[3px] w-full bg-slate-400 z-10" />
        <div
          ref={range}
          className="absolute h-[5px] rounded-[3px] bg-sky-400 z-20"
        />
        <div className="absolute top-3">{minVal}</div>
        <div className="absolute top-3 right-1">{maxVal}</div>
      </div>
    </div>
  );
};

export default RangeSlider;

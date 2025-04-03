import React, { useState, useEffect } from 'react';
import { useRange } from 'react-instantsearch';

const RangeSlider = ({ attribute }) => {
  const {
    range,
    start,
    refine,
  } = useRange({ attribute });

  const [localMax, setLocalMax] = useState(null);

  // Unconditional useEffect to handle initialization
  useEffect(() => {
    if (range) {
      // Initialize localMax with the current start value or max
      setLocalMax(start[1] || range.max);
      console.log(range)
      console.log(start)
    }
  }, [range, start]);

  // If range is not yet available, return null or a loading indicator
  if (!range) {
    return null;
  }


  const { min, max } = range;

  const handleChange = (event) => {
    const newValue = Number(event.target.value);
    setLocalMax(newValue);
    refine([min, newValue]);
  };

  console.log(localMax, " - localMax")

  return (
    <div className="range-slider">
        <div className="range-slider-labels">
            <span>0 min</span>
            <span>{max} min</span>
        </div>
        <input 
                type="range" 
                min={min}
                max={max}
                value={localMax || max}
                onChange={handleChange}
            />
        <div className="range-slider-value">
            {localMax || max} min
        </div>
    </div>
  );
};

export default RangeSlider;
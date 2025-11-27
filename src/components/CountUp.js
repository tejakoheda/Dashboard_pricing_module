// src/components/CountUp.js
import React, { useEffect, useState } from "react";

/**
 * Simple animated counter.
 * props:
 *  - end: number
 *  - duration: seconds
 *  - formatter: function(number) -> string
 */
export default function CountUp({ end = 0, duration = 1.0, formatter }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let raf;
    const start = performance.now();
    const from = 0;
    const to = Number(end) || 0;
    const ms = Math.max(200, duration * 1000);

    const step = (ts) => {
      const t = Math.min(1, (ts - start) / ms);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      const current = from + (to - from) * eased;
      setValue(current);
      if (t < 1) raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [end, duration]);

  const out = formatter
    ? formatter(Math.round(value))
    : Math.round(value).toLocaleString();
  return <span>{out}</span>;
}

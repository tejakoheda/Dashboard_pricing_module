// src/components/CountUp.js
import { useEffect, useState } from "react";

export default function CountUp({ end = 0, duration = 1, formatter }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let raf;
    const start = performance.now();
    const to = +end || 0;
    const ms = Math.max(200, duration * 1000);

    const animate = (now) => {
      const t = Math.min(1, (now - start) / ms);
      setValue(to * (1 - Math.pow(1 - t, 3))); // easeOutCubic
      if (t < 1) raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [end, duration]);

  const rounded = Math.round(value);
  return (
    <span>{formatter ? formatter(rounded) : rounded.toLocaleString()}</span>
  );
}

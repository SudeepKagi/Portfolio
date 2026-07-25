import React from "react";

export const SoundWave = ({ className = "", color = "currentColor" }) => {
  const bars = [
    { delay: "0ms", duration: "0.8s" },
    { delay: "0.1s", duration: "0.9s" },
    { delay: "0.2s", duration: "0.85s" },
    { delay: "0.15s", duration: "0.95s" },
    { delay: "0.05s", duration: "0.88s" },
    { delay: "0.25s", duration: "0.92s" },
  ];

  const isGradient = color.startsWith('linear-gradient') || color.startsWith('radial-gradient');

  return (
    <div className={`flex items-center justify-center gap-[2px] ${className}`}>
      {bars.map((bar, index) => {
        const barStyle = {
          animationDelay: bar.delay,
          animationDuration: bar.duration,
          transition: 'background 0.8s ease-in-out, background-color 0.8s ease-in-out',
        };

        if (isGradient) {
          barStyle.background = color;
        } else {
          barStyle.backgroundColor = color;
        }

        return (
          <div
            key={index}
            className="w-[3px] h-full rounded-full animate-sound-wave"
            style={barStyle}
          />
        );
      })}
    </div>
  );
};

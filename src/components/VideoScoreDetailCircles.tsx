

// components/VideoScoreDetailCircles.tsx
"use client";
import React from "react";

interface DetailMetric {
  label: string;
  value: number;       // 0–100
  color: string;       // e.g., "#10B981" or "#F97316"
}

interface Props {
  metrics: DetailMetric[];
  size?: number;       // diameter in px (default: 120)
  strokeWidth?: number;// thickness in px (default: 12)
}

export default function VideoScoreDetailCircles({
  metrics,
  size = 90,          // increased default size
  strokeWidth = 9,    // increased default thickness
}: Props) {
  // Calculate radius and circumference for the SVG circles
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="w-full bg-white rounded-2xl shadow-xl p-6 space-y-6">
      <h3 className="text-lg font-semibold text-gray-800">
        AI Video Score Details
      </h3>
      {/* 4-column grid for all breakpoints */}
      <div className="grid grid-cols-2 gap-6">
        {metrics.map(({ label, value, color }) => {
          // Compute stroke-dashoffset for the progress arc
          const dashOffset =
            circumference - (value / 100) * circumference;

          return (
            <div
              key={label}
              className="flex flex-col items-center space-y-2"
            >
              <svg
                width={size}
                height={size}
                role="progressbar"
                aria-valuenow={value}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                {/* Background track */}
                <circle
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  stroke="#E5E7EB"                /* bg-gray-200 */
                  strokeWidth={strokeWidth}
                  fill="none"
                />
                {/* Progress arc */}
                <circle
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  stroke={color}
                  strokeWidth={strokeWidth}
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={circumference} 
                  strokeDashoffset={dashOffset} 
                />
                {/* Centered percentage text */}
                <text
                  x="50%"
                  y="50%"
                  dy="0.35em"
                  textAnchor="middle"
                  fontSize="1rem"
                  className="fill-gray-700 font-semibold"
                >
                  {value}%
                </text>
              </svg>
              <span className="text-sm font-medium text-gray-700">
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}


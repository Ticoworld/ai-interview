"use client";
import React from "react";
import { InformationCircleIcon } from "@heroicons/react/24/solid"; // Import the InformationCircleIcon

export function ScoreSummary() {
  return (
    <div className="h-full bg-white rounded-2xl shadow-xl p-6 flex flex-col">
      {/* Container for the top-left icon */}
      <div className="flex items-center mb-4">
        {/* Information Icon */}
        <InformationCircleIcon className="h-6 w-6 text-green-500" /> {/* Added green color class */}
      </div>

      {/* Main Content - Aligned to the left */}
      <div className="flex-1 flex flex-col items-start"> {/* Align items to the start (left) */}
        {/* Score */}
        <div className="text-5xl font-bold text-blue-600 mb-2">85%</div> {/* Adjusted margin bottom */}

        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-800 mb-4"> {/* Adjusted margin bottom */}
          AI Video Score Summary
        </h3>

        {/* Description */}
        {/* Removed px-4 for left alignment, adjusted text color for consistency */}
        <p className="text-gray-600 text-left mb-4">
          The presentation of talent is good. Check the breakdown summary of AI Video Score.
        </p>

        {/* Action Buttons - These remain with their existing alignment */}
        <div className="mt-auto w-full space-y-4"> {/* Use w-full to maintain button width */}
          <div className="flex gap-4">
            <button className="flex-1 flex items-center justify-center px-4 py-3 bg-green-50 text-green-700 rounded-xl hover:bg-green-100 transition-colors">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              Shortlist
            </button>
            <button className="flex-1 flex items-center justify-center px-4 py-3 bg-red-50 text-red-700 rounded-xl hover:bg-red-100 transition-colors">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
              Reject
            </button>
          </div>

          <button className="w-full py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium">
            Hire Talent
          </button>
        </div>
      </div>
    </div>
  );
}
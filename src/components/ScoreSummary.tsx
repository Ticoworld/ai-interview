"use client";
import React from "react";
import { InformationCircleIcon } from "@heroicons/react/24/solid"; // Keep the info icon
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline"; // Import Check and XMark icons

export function ScoreSummary() {
  return (
    <div className="h-full bg-white rounded-2xl shadow-xl p-6 flex flex-col">
      {/* Container for the top-left icon */}
      <div className="flex items-center mb-4">
        {/* Information Icon */}
        <InformationCircleIcon className="h-6 w-6 text-green-500" />
      </div>

      {/* Main Content - Aligned to the left */}
      <div className="flex-1 flex flex-col items-start">
        {/* Score */}
        <div className="text-5xl font-bold text-gray-600 mb-2">85%</div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          AI Video Score Summary
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-left mb-4">
          The presentation of talent is good. Check the breakdown summary of AI Video Score.
        </p>

        {/* Action Buttons - These remain with their existing alignment */}
        <div className="mt-auto w-full space-y-4">
          <div className="flex gap-4">
            {/* Shortlist Button */}
            <button className="flex-1 flex items-center justify-center px-4 py-3 text-green-700 rounded-xl hover:bg-gray-100 transition-colors border border-gray-300 bg-transparent"> 
              <CheckIcon className="w-5 h-5 mr-2" /> {/* Replaced SVG with CheckIcon */}
              Shortlist
            </button>

            {/* Reject Button */}
            <button className="flex-1 flex items-center justify-center px-4 py-3 text-red-700 rounded-xl hover:bg-gray-100 transition-colors border border-gray-300 bg-transparent"> {/* Removed bg-red-50, added border and bg-transparent */}
              <XMarkIcon className="w-5 h-5 mr-2" /> {/* Replaced SVG with XMarkIcon */}
              Reject
            </button>
          </div>

          {/* Hire Talent Button - Stays the same */}
          <button className="w-full py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium">
            Hire Talent
          </button>
        </div>
      </div>
    </div>
  );
}
import React from "react";
import { PositionPreset } from "../global";
import { en } from "../i18n/en";

interface PositionPresetsProps {
  value: PositionPreset;
  onChange: (preset: PositionPreset) => void;
}

// SVG thumbnails — each one is a tiny diagram of where the phone sits
const PRESETS: {
  id: PositionPreset;
  label: string;
  icon: React.ReactNode;
}[] = [
  {
    id: "centered",
    label: en.positionPresets.centered,
    icon: (
      <svg viewBox="0 0 36 52" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-9">
        <rect x="2" y="2" width="32" height="48" rx="4" stroke="currentColor" strokeWidth="2" />
        {/* phone centered */}
        <rect x="10" y="16" width="16" height="22" rx="2" fill="currentColor" opacity="0.5" />
        {/* text lines top */}
        <rect x="7" y="8" width="22" height="2" rx="1" fill="currentColor" opacity="0.4" />
        <rect x="10" y="12" width="16" height="2" rx="1" fill="currentColor" opacity="0.3" />
      </svg>
    ),
  },
  {
    id: "bleed-bottom",
    label: en.positionPresets.bleedBottom,
    icon: (
      <svg viewBox="0 0 36 52" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-9">
        <rect x="2" y="2" width="32" height="48" rx="4" stroke="currentColor" strokeWidth="2" />
        {/* text lines top */}
        <rect x="7" y="8" width="22" height="2" rx="1" fill="currentColor" opacity="0.4" />
        <rect x="10" y="12" width="16" height="2" rx="1" fill="currentColor" opacity="0.3" />
        {/* phone bleeding off bottom */}
        <rect x="10" y="22" width="16" height="26" rx="2" fill="currentColor" opacity="0.5" />
      </svg>
    ),
  },
  {
    id: "bleed-top",
    label: en.positionPresets.bleedTop,
    icon: (
      <svg viewBox="0 0 36 52" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-9">
        <rect x="2" y="2" width="32" height="48" rx="4" stroke="currentColor" strokeWidth="2" />
        {/* phone bleeding off top */}
        <rect x="10" y="0" width="16" height="26" rx="2" fill="currentColor" opacity="0.5" />
        {/* text lines bottom */}
        <rect x="7" y="38" width="22" height="2" rx="1" fill="currentColor" opacity="0.4" />
        <rect x="10" y="43" width="16" height="2" rx="1" fill="currentColor" opacity="0.3" />
      </svg>
    ),
  },
  {
    id: "float-center",
    label: en.positionPresets.floatCenter,
    icon: (
      <svg viewBox="0 0 36 52" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-9">
        <rect x="2" y="2" width="32" height="48" rx="4" stroke="currentColor" strokeWidth="2" />
        {/* text lines top */}
        <rect x="7" y="8" width="22" height="2" rx="1" fill="currentColor" opacity="0.4" />
        <rect x="10" y="12" width="16" height="2" rx="1" fill="currentColor" opacity="0.3" />
        {/* phone floating with shadow hint */}
        <rect x="11" y="22" width="14" height="20" rx="2" fill="currentColor" opacity="0.5" />
        <rect x="13" y="43" width="10" height="2" rx="1" fill="currentColor" opacity="0.15" />
      </svg>
    ),
  },
  {
    id: "float-bottom",
    label: en.positionPresets.floatBottom,
    icon: (
      <svg viewBox="0 0 36 52" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-9">
        <rect x="2" y="2" width="32" height="48" rx="4" stroke="currentColor" strokeWidth="2" />
        {/* text lines top */}
        <rect x="7" y="8" width="22" height="2" rx="1" fill="currentColor" opacity="0.4" />
        <rect x="10" y="12" width="16" height="2" rx="1" fill="currentColor" opacity="0.3" />
        {/* phone pushed toward bottom */}
        <rect x="10" y="28" width="16" height="20" rx="2" fill="currentColor" opacity="0.5" />
      </svg>
    ),
  },
  {
    id: "tilt-left",
    label: en.positionPresets.tiltLeft,
    icon: (
      <svg viewBox="0 0 36 52" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-9">
        <rect x="2" y="2" width="32" height="48" rx="4" stroke="currentColor" strokeWidth="2" />
        <rect x="7" y="8" width="22" height="2" rx="1" fill="currentColor" opacity="0.4" />
        <rect x="10" y="12" width="16" height="2" rx="1" fill="currentColor" opacity="0.3" />
        {/* phone tilted left */}
        <g transform="rotate(-12, 18, 33)">
          <rect x="10" y="20" width="16" height="24" rx="2" fill="currentColor" opacity="0.5" />
        </g>
      </svg>
    ),
  },
  {
    id: "tilt-right",
    label: en.positionPresets.tiltRight,
    icon: (
      <svg viewBox="0 0 36 52" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-9">
        <rect x="2" y="2" width="32" height="48" rx="4" stroke="currentColor" strokeWidth="2" />
        <rect x="7" y="8" width="22" height="2" rx="1" fill="currentColor" opacity="0.4" />
        <rect x="10" y="12" width="16" height="2" rx="1" fill="currentColor" opacity="0.3" />
        {/* phone tilted right */}
        <g transform="rotate(12, 18, 33)">
          <rect x="10" y="20" width="16" height="24" rx="2" fill="currentColor" opacity="0.5" />
        </g>
      </svg>
    ),
  },
  {
    id: "perspective",
    label: en.positionPresets.perspective,
    icon: (
      <svg viewBox="0 0 36 52" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-9">
        <rect x="2" y="2" width="32" height="48" rx="4" stroke="currentColor" strokeWidth="2" />
        <rect x="7" y="8" width="22" height="2" rx="1" fill="currentColor" opacity="0.4" />
        <rect x="10" y="12" width="16" height="2" rx="1" fill="currentColor" opacity="0.3" />
        {/* perspective trapezoid */}
        <polygon points="13,22 23,22 21,44 15,44" fill="currentColor" opacity="0.5" />
      </svg>
    ),
  },
];

export const PositionPresets: React.FC<PositionPresetsProps> = ({ value, onChange }) => {
  return (
    <div className="grid grid-cols-4 gap-2">
      {PRESETS.map((preset) => {
        const isSelected = preset.id === value;
        return (
          <button
            key={preset.id}
            type="button"
            onClick={() => onChange(preset.id)}
            title={preset.label}
            className={`flex flex-col items-center gap-1.5 p-2 rounded-lg border transition-all ${
              isSelected
                ? "border-blue-500 bg-blue-500/10 text-blue-400"
                : "border-gray-700 bg-gray-800 text-gray-400 hover:border-gray-500 hover:text-gray-200"
            }`}
          >
            {preset.icon}
            <span className="text-[9px] leading-tight text-center font-medium">
              {preset.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};
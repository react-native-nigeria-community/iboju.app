// src/components/LeftSidePill.tsx
import React, { useState, JSX } from "react"; 
import { ChevronDownIcon } from "../../icons/ChevronDownIcon";
import { PhoneIcon } from "../../icons/PhoneIcon";
import { en } from "../../i18n/en";
import { LeftSidebarPillProps } from "../../global";

const AnimationStyles = (): JSX.Element => (
  <style>{`
    @keyframes slideContent {
      0% { opacity: 0; transform: translateX(-8px); }
      100% { opacity: 1; transform: translateX(0); }
    }
  `}</style>
);

export default function LeftSidePill({
  addNewScreen,
  setSidebarsCollapsed,
}: LeftSidebarPillProps): JSX.Element {
  const [hovering, setHovering] = useState(false);

  return (
    <>
      <AnimationStyles />
      <div className="w-3 bg-[#0D1423] h-full border-r border-gray-800" />

      <div className="fixed top-16 left-6 z-40">
        <div
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          onClick={() => setSidebarsCollapsed(false)}
          className="flex items-center justify-center bg-[#0D1423] text-white shadow-lg border border-gray-800 rounded-full overflow-hidden cursor-pointer"
          style={{
            height: 40,
            width: hovering ? 160 : 40,
            paddingLeft: hovering ? 10 : 0,
            paddingRight: hovering ? 8 : 0,
            transition: "0.22s ease",
          }}
        >
          {/* Sliding label */}
          {hovering && (
            <div
              className="flex items-center gap-2"
              style={{
                animation: "slideContent 0.18s ease-out",
                whiteSpace: "nowrap",
              }}
            >
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-900">
                <PhoneIcon />
              </span>

              <span className="text-sm font-medium">{en.leftSidebar.screens}</span>

              <ChevronDownIcon />
            </div>
          )}

          {/* Add screen button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              addNewScreen();
            }}
            className="ml-auto w-7 h-7 rounded-full bg-blue-600 hover:bg-blue-700 text-lg flex items-center justify-center"
          >
            +
          </button>
        </div>
      </div>
    </>
  );
}

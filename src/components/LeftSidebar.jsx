import React, { useState } from "react";

function PhoneIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="7" y="2" width="10" height="20" rx="2" ry="2" />
      <circle cx="12" cy="18" r="1" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 011.08 1.04l-4.25 4.25a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd"/>
    </svg>
  );
}

function CollapseIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="15 6 9 12 15 18" />
    </svg>
  );
}

const AnimationStyles = () => (
  <style>{`
    @keyframes slideContent {
      0% { opacity: 0; transform: translateX(-8px); }
      100% { opacity: 1; transform: translateX(0); }
    }
  `}</style>
);

export default function LeftSidebar({
  screens,
  activeIndex,
  setActiveIndex,
  addNewScreen,
  deleteScreen,
  sidebarsCollapsed,
  setSidebarsCollapsed,
}) {
  const [search, setSearch] = useState("");
  const [hovering, setHovering] = useState(false);

  const filteredScreens = screens.filter((screen) =>
    (screen.title || "").toLowerCase().includes(search.toLowerCase())
  );

  // ---------------- EXPANDED ----------------
  if (!sidebarsCollapsed) {
    return (
      <aside className="w-48 bg-[#0D1423] text-white h-full flex flex-col border-r border-gray-800">
        <AnimationStyles />

        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
          <h2 className="text-sm font-semibold tracking-wide">SCREENS</h2>

          <div className="flex items-center gap-2">
            <button
              onClick={addNewScreen}
              className="text-lg bg-blue-600 rounded px-2 leading-none"
            >
              +
            </button>

            <button
              onClick={() => setSidebarsCollapsed(true)}
              className="p-1 bg-gray-900 hover:bg-gray-800 rounded"
            >
              <CollapseIcon />
            </button>
          </div>
        </div>

        <div className="p-4">
          <input
            type="text"
            placeholder="Search screens..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-sm px-3 py-2 rounded bg-gray-900 border border-gray-700"
          />
        </div>

        <div className="flex-1 overflow-y-auto px-2 space-y-1">
          {filteredScreens.map((screen, idx) => (
            <div
              key={screen.id}
              className={`flex items-center justify-between px-3 py-2 rounded cursor-pointer ${
                idx === activeIndex ? "bg-blue-600" : "hover:bg-gray-800"
              }`}
              onClick={() => setActiveIndex(idx)}
            >
              <span className="text-sm truncate">{screen.title || `Screen ${idx + 1}`}</span>

              {screens.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteScreen(screen.id);
                  }}
                  className="text-xs opacity-80 hover:opacity-100"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
        </div>
      </aside>
    );
  }

  // ---------------- COLLAPSED ----------------
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
          {hovering && (
            <div
              className="flex items-center gap-2"
              style={{ animation: "slideContent 0.18s ease-out", whiteSpace: "nowrap" }}
            >
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-900">
                <PhoneIcon />
              </span>
              <span className="text-sm font-medium">Screens</span>
              <ChevronDownIcon />
            </div>
          )}

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

import React from "react";

function GearIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a2 2 0 0 0 .4 2.2l.1.1a1 1 0 0 1-1.4 1.4l-.1-.1a2 2 0 0 0-2.2-.4 2 2 0 0 0-1.2 1.8V21a1 1 0 0 1-2 0v-.2a2 2 0 0 0-1.2-1.8 2 2 0 0 0-2.2.4l-.1.1a1 1 0 1 1-1.4-1.4l.1-.1a2 2 0 0 0 .4-2.2 2 2 0 0 0-1.8-1.2H3a1 1 0 0 1 0-2h.2a2 2 0 0 0 1.8-1.2 2 2 0 0 0-.4-2.2l-.1-.1a1 1 0 1 1 1.4-1.4l.1.1a2 2 0 0 0 2.2.4h.1A2 2 0 0 0 9.8 6V6a1 1 0 1 1 2 0v.2a2 2 0 0 0 1.2 1.8 2 2 0 0 0 2.2-.4l.1-.1a1 1 0 1 1 1.4 1.4l-.1.1a2 2 0 0 0-.4 2.2v.1c.2.7.8 1.3 1.5 1.5h.2A1 1 0 0 1 21 12a1 1 0 0 1-1.6.8h-.2a2 2 0 0 0-1.8 1.2z" />
    </svg>
  );
}

function ArrowLeftIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-3 h-3"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <polyline points="15 6 9 12 15 18" />
    </svg>
  );
}

export default function RightSidebar({
  children,
  sidebarsCollapsed,
  setSidebarsCollapsed,
  onExportCurrent,
  onExportAll,
}) {
  // EXPANDED SIDEBAR
  if (!sidebarsCollapsed) {
    return (
      <aside className="w-80 bg-[#0D1423] text-gray-100 border-l border-gray-800 h-full flex flex-col shadow-lg relative">
        {/* Header row */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wide uppercase text-gray-400">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-900">
              <GearIcon />
            </span>
            <span>Settings</span>
          </div>

          <div className="flex items-center gap-2">
            {/* Export buttons inside header */}
            <button
              onClick={onExportCurrent}
              className="text-xs px-2 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white"
            >
              Export
            </button>
            <button
              onClick={onExportAll}
              className="text-xs px-2 py-1 rounded bg-green-600 hover:bg-green-500 text-white"
            >
              Export All
            </button>

            <button
              onClick={() => setSidebarsCollapsed(true)}
              className="p-1.5 rounded bg-gray-900 hover:bg-gray-800 text-gray-200"
              title="Collapse side panels"
            >
              <ArrowLeftIcon />
            </button>
          </div>
        </div>

        {/* Scrollable content (Controls) */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          {children}
        </div>

        {/* Floating dark pill in bottom-right */}
        <a
          href="https://reactnativenigeria.com"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-4 right-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/80 text-gray-100 border border-gray-700 shadow-lg text-xs md:text-sm transition-transform transition-shadow duration-200 hover:-translate-y-0.5 hover:shadow-xl"
        >
          <span className="hidden sm:inline text-gray-300">
            Built with
          </span>
          <span className="text-red-500 animate-pulse">❤️</span>
          <span className="hidden sm:inline text-gray-200 font-medium">
            React Native Nigeria
          </span>
        </a>
      </aside>
    );
  }

  // COLLAPSED: pill on the right
  return (
    <>
      <div className="w-3 bg-[#0D1423] h-full border-l border-gray-800" />

      <div className="fixed top-16 right-6 z-40">
        <button
          onClick={() => setSidebarsCollapsed(false)}
          className="flex items-center gap-2 bg-[#0D1423] text-white shadow-lg border border-gray-800 rounded-full px-4 py-2 cursor-pointer"
        >
          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-900">
            <GearIcon />
          </span>
          <span className="text-sm font-medium">Settings</span>
          <ArrowLeftIcon />
        </button>
      </div>
    </>
  );
}

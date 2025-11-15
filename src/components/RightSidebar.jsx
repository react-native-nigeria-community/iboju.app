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
  // Expanded state: full dark panel
  if (!sidebarsCollapsed) {
    return (
      <aside className="w-80 bg-[#0D1423] text-gray-100 border-l border-gray-800 h-full flex flex-col shadow-lg">
        {/* Header row inside panel */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wide uppercase text-gray-400">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-900">
              <GearIcon />
            </span>
            <span>Settings</span>
          </div>

          <button
            onClick={() => setSidebarsCollapsed(true)}
            className="p-1.5 rounded bg-gray-900 hover:bg-gray-800 text-gray-200"
            title="Collapse side panels"
          >
            {/* <ArrowLeftIcon /> */}
          </button>
        </div>

        {/* Scrollable content (the Controls) */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          {children}

          {/* Export buttons moved here */}
          <div className="mt-6 space-y-2">
            <button
              onClick={onExportCurrent}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 text-sm font-medium"
            >
              Download Current Screen
            </button>
            <button
              onClick={onExportAll}
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 text-sm font-medium"
            >
              Download All Screens
            </button>
          </div>
        </div>
      </aside>
    );
  }

  // Collapsed: small pill, always expanded (no animation)
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
          {/* <ArrowLeftIcon /> */}
        </button>
      </div>
    </>
  );
}

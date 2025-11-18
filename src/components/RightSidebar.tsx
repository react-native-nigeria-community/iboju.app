import React, { JSX } from "react";
import { en } from "../i18n/en";
import { RightSidebarProps } from "../global";
import { GearIcon } from "../icons/GearIcon";
import { ArrowLeftIcon } from "../icons/ArrowLeftIcon";

export default function RightSidebar({
  children,
  sidebarsCollapsed,
  setSidebarsCollapsed,
  onExportCurrent,
  onExportAll,
}: RightSidebarProps): JSX.Element {
  
  if (!sidebarsCollapsed) {
    return (
      <aside className="w-80 bg-[#0D1423] text-gray-100 border-l border-gray-800 h-full flex flex-col shadow-lg relative">

        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wide uppercase text-gray-400">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-900">
              <GearIcon />
            </span>
            <span>{en.rightSidebar.settings}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onExportCurrent}
              className="text-xs px-2 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white"
            >
              {en.rightSidebar.export}
            </button>

            <button
              onClick={onExportAll}
              className="text-xs px-2 py-1 rounded bg-green-600 hover:bg-green-500 text-white"
            >
              {en.rightSidebar.exportAll}
            </button>

            <button
              onClick={() => setSidebarsCollapsed(true)}
              className="p-1.5 rounded bg-gray-900 hover:bg-gray-800 text-gray-200"
              title={en.rightSidebar.collapse}
            >
              <ArrowLeftIcon />
            </button>
          </div>
        </div>

        {/* Scrollable children (Controls) */}
        <div className="flex-1 overflow-y-auto px-4 py-4">{children}</div>

        {/* Footer Pill */}
        <a
          href="https://reactnativenigeria.com"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-4 right-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/80 text-gray-100 border border-gray-700 shadow-lg text-xs md:text-sm transition-transform hover:-translate-y-0.5 hover:shadow-xl"
        >
          <span className="hidden sm:inline text-gray-300">
            {en.rightSidebar.builtWith}
          </span>
          <span className="text-red-500 animate-pulse">
            {en.rightSidebar.love}
          </span>
          <span className="hidden sm:inline text-gray-200 font-medium">
            {en.rightSidebar.community}
          </span>
        </a>
      </aside>
    );
  }

  /* COLLAPSED SIDEBAR */
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
          <span className="text-sm font-medium">{en.rightSidebar.settings}</span>
          <ArrowLeftIcon />
        </button>
      </div>
    </>
  );
}

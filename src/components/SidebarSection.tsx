import React, { useState, useEffect } from "react";

interface Props {
  title: string;
  children: React.ReactNode;
  id: string;               // unique ID for localStorage
  defaultOpen?: boolean;    // default collapsed = false
}

export const SidebarSection: React.FC<Props> = ({
  title,
  children,
  id,
  defaultOpen = false, // collapsed by default on first load
}) => {
  const storageKey = `iboju_section_${id}`;

  // Read initial collapsed state from localStorage OR use default
  const [open, setOpen] = useState<boolean>(() => {
    const saved = localStorage.getItem(storageKey);
    return saved !== null ? saved === "true" : defaultOpen;
  });

  // Persist state to localStorage
  useEffect(() => {
    localStorage.setItem(storageKey, open ? "true" : "false");
  }, [open, storageKey]);

  return (
    <div className="border-b border-gray-800 pb-2">
      {/* Header */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center text-xs font-semibold tracking-wide text-gray-400 uppercase py-3"
      >
        <span>{title}</span>

        <span
          className={`transition-transform text-gray-500 ${
            open ? "rotate-90" : ""
          }`}
        >
          ▶
        </span>
      </button>

      {/* Body */}
      <div
        className={`transition-all overflow-hidden ${
          open ? "max-h-[900px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="pt-2">{children}</div>
      </div>
    </div>
  );
};

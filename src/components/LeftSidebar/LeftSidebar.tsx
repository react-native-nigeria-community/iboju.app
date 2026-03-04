// LeftSidebar.tsx
import React, { useState } from "react";
import { LeftSidebarProps } from "../../global"; 
import { LeftSidebarExpanded } from "./LeftSidebarExpanded";
import LeftSidePill from "./LeftsidePill";

export default function LeftSidebar(props: LeftSidebarProps) {
  const {
    screens,
    sidebarsCollapsed,
    setSidebarsCollapsed,
    isMobile,
    isOpen,
    onOpen,
    onClose,
  } = props;

  const [search, setSearch] = useState("");

  const filteredScreens = screens.filter((screen) =>
    (screen.title || "").toLowerCase().includes(search.toLowerCase()),
  );

  // ===========================
  // MOBILE VIEW
  // ===========================
  if (isMobile) {
    return (
      <>
        {/* Overlay */}
        {isOpen && (
          <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />
        )}

        {/* Drawer */}
        <aside
          className={`
            fixed top-0 left-0 h-full w-72 bg-white z-50
            transform transition-transform duration-300
            ${isOpen ? "translate-x-0" : "-translate-x-full"}
          `}
        >
          <LeftSidebarExpanded
            {...props}
            search={search}
            setSearch={setSearch}
            screens={screens.map((s) => ({
              id: s.id,
              title: s.title,
            }))}
            filteredScreens={filteredScreens}
          />
        </aside>

        {/* Floating Button */}
        {!isOpen && (
          <button
            onClick={onOpen}
            className="fixed bottom-6 left-6 z-50 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg"
          >
            ☰ Screens
          </button>
        )}
      </>
    );
  }

  // ===========================
  // DESKTOP VIEW
  // ===========================
  if (sidebarsCollapsed) {
    return (
      <LeftSidePill
        addNewScreen={props.addNewScreen}
        setSidebarsCollapsed={props.setSidebarsCollapsed}
      />
    );
  }

  return (
    <LeftSidebarExpanded
      {...props}
      search={search}
      setSearch={setSearch}
      screens={screens.map((s) => ({ id: s.id, title: s.title }))} // convert here
      filteredScreens={filteredScreens}
    />
  );
}

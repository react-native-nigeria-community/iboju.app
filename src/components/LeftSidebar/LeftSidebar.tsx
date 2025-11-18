// LeftSidebar.tsx
import React, { useState } from "react";
import { LeftSidebarProps } from "../../global"; 
import { LeftSidebarExpanded } from "./LeftSidebarExpanded";
import LeftSidePill from "./LeftsidePill";

export default function LeftSidebar(props: LeftSidebarProps) {
  const { screens, sidebarsCollapsed } = props;

  const [search, setSearch] = useState("");

  const filteredScreens = screens.filter((screen) =>
    (screen.title || "").toLowerCase().includes(search.toLowerCase())
  );

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
    screens={screens.map(s => ({ id: s.id, title: s.title }))} // convert here
    filteredScreens={filteredScreens}
    />
  );
}

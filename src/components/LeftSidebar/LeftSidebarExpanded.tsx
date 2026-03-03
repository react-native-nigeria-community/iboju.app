import React, { JSX, useEffect, useRef } from "react";
import { en } from "../../i18n/en";
import { LeftSidebarExpandedProps } from "../../global";
import { CollapseIcon } from "../../icons/CollapseIcon";
import { TabletIcon } from "../../icons/TabletIcon";
import { MobileIcon } from "../../icons/MobileIcon";
import { DesktopIcon } from "../../icons/DesktopIcon";

export const LeftSidebarExpanded = ({
    screens,
    activeIndex,
    setActiveIndex,
    addNewScreen,
    deleteScreen,
    setSidebarsCollapsed,
    search,
    setSearch,
    filteredScreens
}: LeftSidebarExpandedProps): JSX.Element => {
    const [showDevicePicker, setShowDevicePicker] = React.useState(false);
    const pickerRef = useRef<HTMLDivElement | null>(null);

 useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
                setShowDevicePicker(false);
            }
        };
        if (showDevicePicker) {
            document.addEventListener("mousedown", handler);
        }
        return () => document.removeEventListener("mousedown", handler);
    }, [showDevicePicker]);

    return (
        <aside className="w-48 bg-[#0D1423] text-white h-full flex flex-col border-r border-gray-800 relative">
            {/* Header */}
            <div ref={pickerRef}>
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
                <h2 className="text-sm font-semibold tracking-wide">
                    {en.leftSidebar.screens}
                </h2>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setShowDevicePicker((v) => !v)}
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


            {/* Search */}
            {/* You may want to move the search state here, but I'll keep wrapper logic unchanged */}
            
                {/* This input is intentionally static. Wrapper manages search state if needed. */}
                <div className="p-4">
               <div className="h-9">
                    {
                    showDevicePicker ? (
                        <div className="flex gap-1 bg-gray-900 border border-gray-700 rounded-lg p-1">
                        <button
                            onClick={() => {
                                addNewScreen("mobile");
                                setShowDevicePicker(false);
                            }}
                            title="Mobile"
                            className="flex-1 flex items-center justify-center py-1.5 rounded hover:bg-gray-700 transition"
                        >
                            <MobileIcon />
                        </button>

                        <button
                            onClick={() => {
                                addNewScreen("tablet");
                                setShowDevicePicker(false);
                            }}
                            title="Tablet"
                            className="flex-1 flex items-center justify-center py-1.5 rounded hover:bg-gray-700 transition"
                        >
                            <TabletIcon />
                        </button>

                        <button
                            onClick={() => {
                                addNewScreen("desktop");
                                setShowDevicePicker(false);
                            }}
                            title="Desktop"
                            className="flex-1 flex items-center justify-center py-1.5 rounded hover:bg-gray-700 transition"
                        >
                            <DesktopIcon />
                        </button>
                    </div>
                    ) : (
                        <input
                    type="text"
                    placeholder={en.leftSidebar.searchPlaceholder}
                    className="w-full text-sm px-3 py-2 rounded bg-gray-900 border border-gray-700"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                    )
                }
               </div>
            </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto px-2 space-y-1">
                {filteredScreens.map((screen, idx) => (
                    <div
                        key={screen.id}
                        className={`flex items-center justify-between px-3 py-2 rounded cursor-pointer ${idx === activeIndex ? "bg-blue-600" : "hover:bg-gray-800"
                            }`}
                        onClick={() => setActiveIndex(idx)}
                    >
                        <span className="text-sm truncate">
                            {screen.title || `${en.leftSidebar.screen} ${idx + 1}`}
                        </span>

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
};

import React, { JSX } from "react";
import { en } from "../../i18n/en";
import { LeftSidebarExpandedProps } from "../../global";
import { CollapseIcon } from "../../icons/CollapseIcon";

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

    return (
        <aside className="w-48 bg-[#0D1423] text-white h-full flex flex-col border-r border-gray-800">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
                <h2 className="text-sm font-semibold tracking-wide">
                    {en.leftSidebar.screens}
                </h2>

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

            {/* Search */}
            {/* You may want to move the search state here, but I'll keep wrapper logic unchanged */}
            <div className="p-4">
                {/* This input is intentionally static. Wrapper manages search state if needed. */}
                <input
                    type="text"
                    placeholder={en.leftSidebar.searchPlaceholder}
                    className="w-full text-sm px-3 py-2 rounded bg-gray-900 border border-gray-700"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
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

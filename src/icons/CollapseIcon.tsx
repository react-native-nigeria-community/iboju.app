import React, { JSX } from "react";

export function CollapseIcon(): JSX.Element {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
        >
            <polyline points="15 6 9 12 15 18" />
        </svg>
    );
}
import React, { JSX } from "react";

export function PhoneIcon(): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="7" y="2" width="10" height="20" rx="2" ry="2" />
      <circle cx="12" cy="18" r="1" />
    </svg>
  );
}
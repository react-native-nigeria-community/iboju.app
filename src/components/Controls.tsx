// src/components/Controls.tsx
import React, { ChangeEvent, useState, useEffect } from "react";
import { en } from "../i18n/en";
import { ControlsProps } from "../global";

/* ------------------------------------------
   Collapsible Section Component (Figma-style)
------------------------------------------- */
interface SectionProps {
  title: string;
  id: string; // unique for localStorage
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const SidebarSection: React.FC<SectionProps> = ({
  title,
  id,
  children,
  defaultOpen = false,
}) => {
  const storageKey = `iboju_section_${id}`;

  const [open, setOpen] = useState<boolean>(() => {
    const saved = localStorage.getItem(storageKey);
    return saved !== null ? saved === "true" : defaultOpen;
  });

  useEffect(() => {
    localStorage.setItem(storageKey, open ? "true" : "false");
  }, [open]);

  return (
    <div className="border-b border-gray-800 pb-2">
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

      <div
        className={`transition-all overflow-hidden ${
          open ? "max-h-[700px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="pt-2 space-y-3">{children}</div>
      </div>
    </div>
  );
};

/* ------------------------------------------
               Controls Component
------------------------------------------- */
export const Controls: React.FC<ControlsProps> = ({
  bgStyle,
  customBg,
  textAlign,
  layout,
  titleColor,
  subtitleColor,
  isTextColorCustom,
  setBgStyle,
  setCustomBg,
  setTextAlign,
  setLayout,
  setTitleColor,
  setSubtitleColor,
  setIsTextColorCustom,
  handleImageUpload,
  onPresetChange,
}) => {
  const handleCustomColorChange = (e: ChangeEvent<HTMLInputElement>) =>
    setCustomBg(e.target.value);

  const handleCustomColorTextChange = (e: ChangeEvent<HTMLInputElement>) =>
    setCustomBg(e.target.value);

  const isGradientOrPreset =
    bgStyle &&
    (bgStyle.includes("bg-gradient") ||
      bgStyle.includes("bg-gray") ||
      bgStyle.includes("bg-white"));

  const handlePresetSelect = (value: string) => {
    if (value === "custom") return;
    setCustomBg(null);
    setBgStyle(value);
    onPresetChange?.(value);
  };

  const handleResetTextColors = () => {
    const isDarkBg = bgStyle.includes("bg-gray-800");
    const defaultTitle = isDarkBg ? "#F9FAFB" : "#111827";
    const defaultSubtitle = isDarkBg ? "#E5E7EB" : "#4B5563";

    setTitleColor(defaultTitle);
    setSubtitleColor(defaultSubtitle);
    setIsTextColorCustom(false);
  };

  return (
    <div className="space-y-4 text-sm">
      {/* =============================
          SECTION: Screenshot
      ============================== */}
      <SidebarSection id="screenshot" title={en.controls.screenshot}>
        <label className="block text-[11px] text-gray-400">
          {en.controls.uploadScreenshot}
        </label>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="block w-full text-xs text-gray-100 bg-[#111827] border border-gray-700 rounded-md px-2 py-1.5 
          file:mr-3 file:px-3 file:py-1 file:rounded file:border-0 
          file:text-xs file:bg-blue-600 file:text-white hover:file:bg-blue-500"
        />
      </SidebarSection>

      {/* =============================
          SECTION: Background
      ============================== */}
      <SidebarSection id="background" title={en.controls.background}>
        {/* Preset styles */}
        <div>
          <label className="block text-[11px] text-gray-400">
            {en.controls.presetStyle}
          </label>

          <select
            className="w-full bg-[#111827] border border-gray-700 rounded-md px-2 py-1.5 text-xs text-gray-100 
            focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={isGradientOrPreset ? bgStyle : "custom"}
            onChange={(e) => handlePresetSelect(e.target.value)}
          >
            <option value="bg-white">{en.controls.white}</option>
            <option value="bg-gradient-to-r from-purple-400 to-pink-500">
              {en.controls.purplePink}
            </option>
            <option value="bg-gradient-to-r from-blue-400 to-green-400">
              {en.controls.blueGreen}
            </option>
            <option value="bg-gray-800 text-white">{en.controls.dark}</option>
            <option value="custom">{en.controls.custom}</option>
          </select>
        </div>

        {/* Custom background */}
        <div>
          <label className="block text-[11px] text-gray-400">
            {en.controls.customColor}
          </label>

          <div className="flex items-center gap-2">
            <input
              type="color"
              value={customBg || "#ffffff"}
              onChange={handleCustomColorChange}
              className="w-9 h-9 rounded border border-gray-700 bg-[#111827] cursor-pointer"
            />

            <input
              type="text"
              value={customBg || ""}
              onChange={handleCustomColorTextChange}
              placeholder={en.controls.customPlaceholder}
              className="flex-1 bg-[#111827] border border-gray-700 rounded-md px-2 py-1.5 
              text-xs text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>
      </SidebarSection>

      {/* =============================
          SECTION: Text Colors
      ============================== */}
      <SidebarSection id="textColors" title={en.controls.textColorSection}>
        {/* Title Color */}
        <div className="flex items-center gap-2">
          <label className="block text-[11px] text-gray-400 w-20">
            {en.controls.titleColor}
          </label>
          <input
            type="color"
            value={titleColor}
            onChange={(e) => {
              setTitleColor(e.target.value);
              setIsTextColorCustom(true);
            }}
            className="w-9 h-9 rounded border border-gray-700 bg-[#111827] cursor-pointer"
          />
        </div>

        {/* Subtitle Color */}
        <div className="flex items-center gap-2">
          <label className="block text-[11px] text-gray-400 w-20">
            {en.controls.subtitleColor}
          </label>
          <input
            type="color"
            value={subtitleColor}
            onChange={(e) => {
              setSubtitleColor(e.target.value);
              setIsTextColorCustom(true);
            }}
            className="w-9 h-9 rounded border border-gray-700 bg-[#111827] cursor-pointer"
          />
        </div>

        <button
          type="button"
          onClick={handleResetTextColors}
          disabled={!isTextColorCustom}
          className={`mt-1 text-[11px] px-2 py-1 rounded border ${
            isTextColorCustom
              ? "border-gray-600 text-gray-200 hover:bg-gray-800"
              : "border-gray-800 text-gray-500 cursor-not-allowed"
          }`}
        >
          {en.controls.resetTextColor}
        </button>
      </SidebarSection>

      {/* =============================
          SECTION: Layout + Alignment
      ============================== */}
      <SidebarSection id="layout" title={en.controls.layoutText}>
        {/* Layout */}
        <div>
          <label className="block text-[11px] text-gray-400">
            {en.controls.layout}
          </label>

          <div className="inline-flex rounded-md bg-[#111827] border border-gray-700 p-0.5">
            {(["default", "inverted"] as const).map((type) => (
              <button
                key={type}
                onClick={() => setLayout(type)}
                className={`px-3 py-1 text-xs rounded ${
                  layout === type
                    ? "bg-blue-600 text-white"
                    : "text-gray-200 hover:bg-gray-800"
                }`}
              >
                {type === "default"
                  ? en.controls.default
                  : en.controls.inverted}
              </button>
            ))}
          </div>
        </div>

        {/* Text alignment */}
        <div>
          <label className="block text-[11px] text-gray-400">
            {en.controls.textAlignment}
          </label>

          <div className="inline-flex rounded-md bg-[#111827] border border-gray-700 p-0.5">
            {(["left", "center", "right"] as const).map((align) => (
              <button
                key={align}
                onClick={() => setTextAlign(align)}
                className={`px-3 py-1 text-xs rounded capitalize ${
                  textAlign === align
                    ? "bg-blue-600 text-white"
                    : "text-gray-200 hover:bg-gray-800"
                }`}
              >
                {en.controls[align]}
              </button>
            ))}
          </div>
        </div>
      </SidebarSection>
    </div>
  );
};

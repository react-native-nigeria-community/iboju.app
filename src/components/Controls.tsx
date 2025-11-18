import React, { ChangeEvent } from "react";
import { ControlsProps } from "../global";
import { en } from "../i18n/en";

export const Controls: React.FC<ControlsProps> = ({
  bgStyle,
  customBg,
  textAlign,
  layout,
  setBgStyle,
  setCustomBg,
  setTextAlign,
  setLayout,
  handleImageUpload,
}) => {

  const t = en.controls;

  const handleCustomColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCustomBg(e.target.value);
  };

  const handleCustomColorTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCustomBg(e.target.value);
  };

  const isGradientOrPreset =
    bgStyle &&
    (bgStyle.includes("bg-gradient") ||
      bgStyle.includes("bg-gray") ||
      bgStyle.includes("bg-white"));

  return (
    <div className="space-y-6 text-sm">
      {/* SECTION: Screenshot */}
      <section>
        <h2 className="text-xs font-semibold tracking-wide text-gray-400 uppercase mb-3">
          {t.screenshot}
        </h2>

        <div className="space-y-2">
          <label className="block text-[11px] text-gray-400">
            {t.uploadScreenshot}
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="block w-full text-xs text-gray-100 bg-[#111827] border border-gray-700 rounded-md px-2 py-1.5 
            file:mr-3 file:px-3 file:py-1 file:rounded file:border-0 
            file:text-xs file:bg-blue-600 file:text-white hover:file:bg-blue-500"
          />
        </div>
      </section>

      <div className="h-px bg-gray-800" />

      {/* SECTION: Background */}
      <section>
        <h2 className="text-xs font-semibold tracking-wide text-gray-400 uppercase mb-3">
          {t.background}
        </h2>

        {/* Preset styles */}
        <div className="space-y-2 mb-3">
          <label className="block text-[11px] text-gray-400">
            {t.presetStyle}
          </label>
          <select
            className="w-full bg-[#111827] border border-gray-700 rounded-md px-2 py-1.5 text-xs text-gray-100 
            focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={isGradientOrPreset ? bgStyle : "custom"}
            onChange={(e) => {
              const value = e.target.value;
              if (value === "custom") return;
              setCustomBg(null);
              setBgStyle(value);
            }}
          >
            <option value="bg-white">{t.white}</option>
            <option value="bg-gradient-to-r from-purple-400 to-pink-500">
              {t.purplePink}
            </option>
            <option value="bg-gradient-to-r from-blue-400 to-green-400">
              {t.blueGreen}
            </option>
            <option value="bg-gray-800 text-white">{t.dark}</option>
            <option value="custom">{t.custom}</option>
          </select>
        </div>

        {/* Custom background */}
        <div className="space-y-2">
          <label className="block text-[11px] text-gray-400">
            {t.customColor}
          </label>

          <div className="flex items-center gap-2">
            <input
              type="color"
              value={customBg || "#ffffff"}
              onChange={handleCustomColorChange}
              className="w-9 h-9 rounded border border-gray-700 bg-[#111827] p-0 cursor-pointer"
            />

            <input
              type="text"
              value={customBg || ""}
              onChange={handleCustomColorTextChange}
              placeholder={t.customPlaceholder}
              className="flex-1 bg-[#111827] border border-gray-700 rounded-md px-2 py-1.5 
              text-xs text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>
      </section>

      <div className="h-px bg-gray-800" />

      {/* SECTION: Layout & Text */}
      <section>
        <h2 className="text-xs font-semibold tracking-wide text-gray-400 uppercase mb-3">
          {t.layoutText}
        </h2>

        {/* Layout */}
        <div className="mb-4 space-y-2">
          <label className="block text-[11px] text-gray-400">
            {t.layout}
          </label>

          <div className="inline-flex rounded-md bg-[#111827] border border-gray-700 p-0.5">
            {(["default", "inverted"] as const).map((type) => (
              <button
                key={type}
                onClick={() => setLayout(type)}
                className={`px-3 py-1 text-xs rounded ${layout === type
                    ? "bg-blue-600 text-white"
                    : "text-gray-200 hover:bg-gray-800"
                  }`}
              >
                {t[type]}
              </button>
            ))}
          </div>
        </div>

        {/* Text align */}
        <div className="space-y-2">
          <label className="block text-[11px] text-gray-400">
            {t.textAlignment}
          </label>

          <div className="inline-flex rounded-md bg-[#111827] border border-gray-700 p-0.5">
            {(["left", "center", "right"] as const).map((align) => (
              <button
                key={align}
                onClick={() => setTextAlign(align)}
                className={`px-3 py-1 text-xs rounded capitalize ${textAlign === align
                    ? "bg-blue-600 text-white"
                    : "text-gray-200 hover:bg-gray-800"
                  }`}
              >
                {t[align]}
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

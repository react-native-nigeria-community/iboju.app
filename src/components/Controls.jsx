import React from "react";

export const Controls = ({
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
  const handleCustomColorChange = (e) => {
    const value = e.target.value;
    setCustomBg(value);
  };

  const handleCustomColorTextChange = (e) => {
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
          Screenshot
        </h2>

        <div className="space-y-2">
          <label className="block text-[11px] text-gray-400">
            Upload screenshot
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="block w-full text-xs text-gray-100 bg-[#111827] border border-gray-700 rounded-md px-2 py-1.5 file:mr-3 file:px-3 file:py-1 file:rounded file:border-0 file:text-xs file:bg-blue-600 file:text-white hover:file:bg-blue-500"
          />
        </div>
      </section>

      <div className="h-px bg-gray-800" />

      {/* SECTION: Background */}
      <section>
        <h2 className="text-xs font-semibold tracking-wide text-gray-400 uppercase mb-3">
          Background
        </h2>

        {/* Preset styles */}
        <div className="space-y-2 mb-3">
          <label className="block text-[11px] text-gray-400">
            Preset style
          </label>
          <select
            className="w-full bg-[#111827] border border-gray-700 rounded-md px-2 py-1.5 text-xs text-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={isGradientOrPreset ? bgStyle : "custom"}
            onChange={(e) => {
              const value = e.target.value;
              if (value === "custom") return;
              setBgStyle(value);
            }}
          >
            <option value="bg-white">White</option>
            <option value="bg-gradient-to-r from-purple-400 to-pink-500">
              Purple → Pink
            </option>
            <option value="bg-gradient-to-r from-blue-400 to-green-400">
              Blue → Green
            </option>
            <option value="bg-gray-800 text-white">Dark</option>
            <option value="custom">Custom color</option>
          </select>
        </div>

        {/* Custom background */}
        <div className="space-y-2">
          <label className="block text-[11px] text-gray-400">
            Custom color
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
              placeholder="#FF9900 or rgb(0,0,0)"
              className="flex-1 bg-[#111827] border border-gray-700 rounded-md px-2 py-1.5 text-xs text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>
      </section>

      <div className="h-px bg-gray-800" />

      {/* SECTION: Layout & Text */}
      <section>
        <h2 className="text-xs font-semibold tracking-wide text-gray-400 uppercase mb-3">
          Layout & Text
        </h2>

        {/* Layout type */}
        <div className="mb-4 space-y-2">
          <label className="block text-[11px] text-gray-400">Layout</label>
          <div className="inline-flex rounded-md bg-[#111827] border border-gray-700 p-0.5">
            {["default", "inverted"].map((type) => (
              <button
                key={type}
                onClick={() => setLayout(type)}
                className={`px-3 py-1 text-xs rounded ${
                  layout === type
                    ? "bg-blue-600 text-white"
                    : "text-gray-200 hover:bg-gray-800"
                }`}
              >
                {type === "default" ? "Default" : "Inverted"}
              </button>
            ))}
          </div>
        </div>

        {/* Text alignment */}
        <div className="space-y-2">
          <label className="block text-[11px] text-gray-400">
            Text alignment
          </label>
          <div className="inline-flex rounded-md bg-[#111827] border border-gray-700 p-0.5">
            {["left", "center", "right"].map((align) => (
              <button
                key={align}
                onClick={() => setTextAlign(align)}
                className={`px-3 py-1 text-xs rounded capitalize ${
                  textAlign === align
                    ? "bg-blue-600 text-white"
                    : "text-gray-200 hover:bg-gray-800"
                }`}
              >
                {align}
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

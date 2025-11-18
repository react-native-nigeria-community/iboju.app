import React, { ChangeEvent, useCallback, useMemo } from "react";
import { en } from "../i18n/en";
import { ColorPickerProps } from "../global";
import { PRESET_GRADIENTS } from "../constants";

export const ColorPicker = React.memo(function ColorPicker({
  bgStyle,
  setBgStyle,
}: ColorPickerProps) {
  
  const handleColorChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const color = e.target.value;
      setBgStyle(color);
    },
    [setBgStyle]
  );

  const dropdownValue = useMemo(() => {
    return PRESET_GRADIENTS.some((g) => g.value === bgStyle)
      ? bgStyle
      : "custom";
  }, [bgStyle]);

  const selectedCustomColor = useMemo(() => {
    return dropdownValue === "custom" && bgStyle.startsWith("#")
      ? bgStyle
      : "#ffffff";
  }, [dropdownValue, bgStyle]);

  return (
    <div className="space-y-3">
      <label className="block font-medium mb-1">
        {en.colorPicker.backgroundStyleLabel}
      </label>

      <select
        aria-label={en.colorPicker.chooseGradientAria}
        className="w-full border p-2 rounded"
        onChange={(e) => setBgStyle(e.target.value)}
        value={dropdownValue}
      >
        <option disabled value="custom">
          {en.colorPicker.chooseGradientPlaceholder}
        </option>

        {PRESET_GRADIENTS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}

        <option value="custom">{en.colorPicker.customColor}</option>
      </select>

      <div className="flex items-center gap-3">
        <input
          type="color"
          aria-label={en.colorPicker.pickColorAria}
          onChange={handleColorChange}
          className="w-10 h-10 p-0 border rounded cursor-pointer"
          value={selectedCustomColor}
        />

        <div
          className="w-6 h-6 rounded-full border"
          style={{ backgroundColor: selectedCustomColor }}
        ></div>

        <span className="text-sm text-gray-600">
          {en.colorPicker.solidColorLabel}
        </span>
      </div>
    </div>
  );
});

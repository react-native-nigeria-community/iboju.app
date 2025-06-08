import React from 'react';

const PRESET_GRADIENTS = [
  {
    name: 'Purple → Pink',
    value: 'bg-gradient-to-r from-purple-400 to-pink-500'
  },
  {
    name: 'Blue → Green',
    value: 'bg-gradient-to-r from-blue-400 to-green-400'
  },
  {
    name: 'Dark',
    value: 'bg-gray-800 text-white'
  }
];

export const ColorPicker = ({ bgStyle, setBgStyle }) => {
  const handleColorChange = (e) => {
    setBgStyle(`bg-[${e.target.value}]`);
  };

  return (
    <div className="space-y-3">
      <label className="block font-medium mb-1">Background Style</label>

      <select
        className="w-full border p-2 rounded"
        onChange={(e) => setBgStyle(e.target.value)}
        value={bgStyle.includes('bg-gradient') || bgStyle.includes('bg-gray') ? bgStyle : 'custom'}
      >
        <option disabled value="custom">-- Choose a Gradient --</option>
        {PRESET_GRADIENTS.map((option) => (
          <option key={option.value} value={option.value}>{option.name}</option>
        ))}
      </select>

      <div className="flex items-center gap-2">
        <input
          type="color"
          onChange={handleColorChange}
          title="Pick custom background color"
          className="w-10 h-10 p-0 border rounded cursor-pointer"
        />
        <span className="text-sm text-gray-600">or pick a solid color</span>
      </div>
    </div>
  );
};

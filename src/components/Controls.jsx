import React from 'react';

export const Controls = ({
  bgStyle,
  customBg,
  textAlign,
  layout,
  setBgStyle,
  setTextAlign,
  setLayout,
  handleImageUpload
}) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 space-y-6">
        <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">Design Options</h2>

        {/* Upload screenshot */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-600">Upload Screenshot</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="block w-full text-sm text-gray-800 bg-white border border-gray-300 rounded-md shadow-sm file:mr-4 file:py-1 file:px-2 file:rounded file:border-0 file:text-sm file:bg-blue-100 file:text-blue-800 hover:file:bg-blue-200"
          />
        </div>

        {/* Background Style (Preset) */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-600">Background Style</label>

          <select
            className="w-full border border-gray-300 rounded-md p-2 text-sm bg-white"
            onChange={(e) =>
              setBgStyle({ bgStyle: e.target.value, customBg: null })
            }
            value={customBg ? 'custom' : bgStyle}
          >
            <option value="bg-white">White</option>
            <option value="bg-gradient-to-r from-purple-400 to-pink-500">Purple → Pink</option>
            <option value="bg-gradient-to-r from-blue-400 to-green-400">Blue → Green</option>
            <option value="bg-gray-800 text-white">Dark</option>
          </select>
        </div>

        {/* Custom Background Color Picker */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-600">Custom Background</label>

          {/* Color Picker */}
          <input
            type="color"
            className="w-10 h-10 p-0 border rounded cursor-pointer"
            onChange={(e) => setBgStyle({ customBg: e.target.value })}
          />

          {/* Manual HEX/RGB input */}
          <input
            type="text"
            placeholder="#FF9900 or rgb(0,0,0)"
            className="w-full border border-gray-300 rounded-md p-2 text-sm"
            onChange={(e) => setBgStyle({ customBg: e.target.value })}
          />
        </div>

        {/* Text Alignment */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-600">Text Alignment</label>
          <div className="flex gap-2">
            {['left', 'center', 'right'].map((align) => (
              <button
                key={align}
                onClick={() => setTextAlign({ textAlign: align })}
                className={`px-3 py-1 rounded-md text-sm border transition ${
                  textAlign === align
                    ? 'bg-blue-600 text-white'
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-blue-50'
                }`}
              >
                {align}
              </button>
            ))}
          </div>
        </div>

        {/* Layout
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-600">Layout</label>
          <div className="flex gap-2">
            {['default', 'inverted'].map((layoutType) => (
              <button
                key={layoutType}
                onClick={() => setLayout({ layout: layoutType })}
                className={`px-3 py-1 rounded-md text-sm border transition ${
                  layout === layoutType
                    ? 'bg-blue-600 text-white'
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-blue-50'
                }`}
              >
                {layoutType.charAt(0).toUpperCase() + layoutType.slice(1)}
              </button>
            ))}
          </div>
        </div> */}
      </div>
    </div>
  );
};

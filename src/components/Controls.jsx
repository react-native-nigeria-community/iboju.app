import React from 'react';

export const Controls = ({
  bgStyle,
  setBgStyle,
  textAlign,
  setTextAlign,
  layout,
  setLayout,
  handleImageUpload,
  handleExport
}) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 space-y-6">
        <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">Design Options</h2>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-600">Upload Screenshot</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="block w-full text-sm text-gray-800 bg-white border border-gray-300 rounded-md shadow-sm file:mr-4 file:py-1 file:px-2 file:rounded file:border-0 file:text-sm file:bg-blue-100 file:text-blue-800 hover:file:bg-blue-200"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-600">Background Style</label>
          <select
            className="w-full border border-gray-300 rounded-md p-2 text-sm bg-white"
            onChange={(e) => setBgStyle(e.target.value)}
            value={bgStyle}
          >
            <option value="bg-white">White</option>
            <option value="bg-gradient-to-r from-purple-400 to-pink-500">Purple → Pink</option>
            <option value="bg-gradient-to-r from-blue-400 to-green-400">Blue → Green</option>
            <option value="bg-gray-800 text-white">Dark</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-600">Text Alignment</label>
          <div className="flex gap-2">
            {['left', 'center', 'right'].map((align) => (
              <button
                key={align}
                onClick={() => setTextAlign(align)}
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

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-600">Layout</label>
          <div className="flex gap-2">
            {['default', 'inverted'].map((layoutType) => (
              <button
                key={layoutType}
                onClick={() => setLayout(layoutType)}
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
        </div>
      </div>

      <div className="pt-6">
        <button
          onClick={handleExport}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
        >
          Export as PNG
        </button>
      </div>
    </div>
  );
};

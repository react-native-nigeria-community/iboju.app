import React from 'react';
export const Controls = ({ bgStyle, setBgStyle, textAlign, setTextAlign, handleImageUpload, handleExport }) => {
  return (
    <div className="flex-1 space-y-4">
      <div>
        <label className="block font-medium mb-1">Upload Screenshot</label>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
      </div>

      <div>
        <label className="block font-medium mb-1">Background Style</label>
        <select
          className="w-full border p-2 rounded"
          onChange={(e) => setBgStyle(e.target.value)}
          value={bgStyle}
        >
          <option value="bg-white">White</option>
          <option value="bg-gradient-to-r from-purple-400 to-pink-500">Purple → Pink</option>
          <option value="bg-gradient-to-r from-blue-400 to-green-400">Blue → Green</option>
          <option value="bg-gray-800 text-white">Dark</option>
        </select>
      </div>

      <div>
        <label className="block font-medium mb-1">Text Alignment</label>
        <div className="flex gap-2">
          {['left', 'center', 'right'].map((align) => (
            <button
              key={align}
              onClick={() => setTextAlign(align)}
              className={`px-3 py-1 border rounded ${textAlign === align ? 'bg-blue-600 text-white' : ''}`}
            >
              {align}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleExport}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Export as PNG
      </button>
    </div>
  );
}
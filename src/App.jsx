import React, { useState, useRef } from 'react';
import { toPng } from 'html-to-image';

function App() {
  const [screenshot, setScreenshot] = useState(null);
  const [title, setTitle] = useState('Your App Title');
  const [subtitle, setSubtitle] = useState('Your subtitle here');
  const [textAlign, setTextAlign] = useState('center');
  const [bgStyle, setBgStyle] = useState('bg-white');
  const previewRef = useRef(null);
  const exportRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) setScreenshot(URL.createObjectURL(file));
  };

  const handleExport = async () => {
    if (!exportRef.current) return;
    const exportNode = exportRef.current.cloneNode(true);
    exportNode.style.width = '1290px';
    exportNode.style.height = '2796px';

    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.left = '-9999px';
    container.style.top = '0';
    container.appendChild(exportNode);
    document.body.appendChild(container);

    const dataUrl = await toPng(exportNode, {
      width: 1290,
      height: 2796,
    });

    document.body.removeChild(container);

    const link = document.createElement('a');
    link.download = 'preview.png';
    link.href = dataUrl;
    link.click();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">PreviewKit</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Controls */}
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

        {/* Visible Preview */}
        <div className="flex-1">
          <div
            ref={previewRef}
            className={`relative w-full max-w-md mx-auto p-6 rounded-xl shadow-xl space-y-4 ${bgStyle}`}
            style={{ height: '700px', overflow: 'hidden', textAlign }}
          >
            <h2
              contentEditable
              suppressContentEditableWarning
              onInput={(e) => setTitle(e.currentTarget.textContent)}
              className="text-xl font-bold outline-none" 
              style={{ unicodeBidi: 'isolate', direction: 'ltr',  textAlign }}
            >
              {title}
            </h2>
            <p
              contentEditable
              suppressContentEditableWarning
              onInput={(e) => setSubtitle(e.currentTarget.textContent)}
              className="text-gray-600 outline-none" 
              style={{ unicodeBidi: 'isolate', direction: 'ltr', textAlign }}
            >
              {subtitle}
            </p>
            <div className="absolute left-1/2 bottom-[-60px] transform -translate-x-1/2 bg-black rounded-[32px] p-2 border-4 border-black shadow-md">
              <div className="w-[220px] h-[440px] bg-white rounded-[24px] overflow-hidden relative flex items-center justify-center">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-3 bg-black rounded-b-xl z-10"></div>
                {screenshot ? (
                  <img
                    src={screenshot}
                    alt="App Screenshot"
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <span className="text-gray-400 text-sm text-center">No screenshot</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Hidden Export Preview */}
        <div style={{ visibility: 'hidden', position: 'absolute', pointerEvents: 'none' }}>
          <div
            ref={exportRef}
            className={`relative w-[1290px] h-[2796px] px-32 pt-32 pb-0 rounded-xl shadow-xl ${bgStyle}`}
            style={{ overflow: 'hidden', textAlign }}
          >
            <div className="space-y-16">
              <h2
                className="text-8xl font-bold leading-tight" 
                style={{ unicodeBidi: 'plaintext', direction: 'ltr', textAlign  }}
              >
                {title}
              </h2>
              <p
                className="text-5xl text-gray-600 leading-snug" 
                style={{ unicodeBidi: 'plaintext', direction: 'ltr', textAlign }}
              >
                {subtitle}
              </p>
            </div>
            <div className="absolute left-1/2 bottom-[-100px] transform -translate-x-1/2 bg-black rounded-[110px] p-6 border-[10px] border-black">
              <div className="w-[950px] h-[1900px] bg-white rounded-[106px] overflow-hidden relative flex items-center justify-center">
                {/* iPhone-style notch */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-48 h-6 bg-black rounded-b-2xl z-10"></div>
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-2.5 bg-gray-700 rounded-full mt-[10px]"></div>

                {screenshot ? (
                  <img
                    src={screenshot}
                    alt="App Screenshot"
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <span className="text-gray-400 text-2xl text-center">No screenshot</span>
                )}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;

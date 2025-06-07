import React, { useState, useRef, useCallback, useEffect } from 'react';
import { toPng } from 'html-to-image';
import { Controls } from './components/Controls';
import { Preview } from './components/Preview';
import { ExportPreview } from './components/ExportPreview';

function App() {
  const [screenshot, setScreenshot] = useState(null);
  const [title, setTitle] = useState('Your App Title');
  const [subtitle, setSubtitle] = useState('Your subtitle here');
  const [textAlign, setTextAlign] = useState('center');
  const [bgStyle, setBgStyle] = useState('bg-white');
  const exportRef = useRef(null);

  const handleImageUpload = useCallback((e) => {
    const file = e.target.files?.[0];
    if (file) setScreenshot(URL.createObjectURL(file));
  }, []);

  const handleExport = useCallback(async () => {
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

    try {
      const dataUrl = await toPng(exportNode, {
        width: 1290,
        height: 2796,
      });

      const link = document.createElement('a');
      link.download = 'preview.png';
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Export failed:', err);
    } finally {
      document.body.removeChild(container);
    }
  }, []);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="min-h-screen h-screen bg-gray-100 flex flex-col overflow-hidden">
      <header className="p-6 border-b border-gray-300">
        <h1 className="text-3xl font-bold text-blue-700">PreviewKit</h1>
      </header>
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar for Controls */}
        <aside className="w-80 bg-gradient-to-b from-white to-gray-50 p-6 border-r border-gray-200 overflow-y-auto shadow-md">
          <Controls
            bgStyle={bgStyle}
            setBgStyle={setBgStyle}
            textAlign={textAlign}
            setTextAlign={setTextAlign}
            handleImageUpload={handleImageUpload}
            handleExport={handleExport}
          />
        </aside>

        {/* Main Canvas Area */}
        <main className="flex-1 flex items-center justify-center overflow-hidden">
          <Preview
            title={title}
            setTitle={setTitle}
            subtitle={subtitle}
            setSubtitle={setSubtitle}
            screenshot={screenshot}
            textAlign={textAlign}
            bgStyle={bgStyle}
          />
          <ExportPreview
            exportRef={exportRef}
            title={title}
            subtitle={subtitle}
            screenshot={screenshot}
            textAlign={textAlign}
            bgStyle={bgStyle}
          />
        </main>
      </div>
    </div>
  );
}

export default App;

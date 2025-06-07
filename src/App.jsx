import React, { useState, useRef } from 'react';
import { toPng } from 'html-to-image';
import {Controls} from './components/Controls';
import {Preview} from './components/Preview';
import {ExportPreview} from './components/ExportPreview';

function App() {
  const [screenshot, setScreenshot] = useState(null);
  const [title, setTitle] = useState('Your App Title');
  const [subtitle, setSubtitle] = useState('Your subtitle here');
  const [textAlign, setTextAlign] = useState('center');
  const [bgStyle, setBgStyle] = useState('bg-white');
  const exportRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
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
        <Controls
          bgStyle={bgStyle}
          setBgStyle={setBgStyle}
          textAlign={textAlign}
          setTextAlign={setTextAlign}
          handleImageUpload={handleImageUpload}
          handleExport={handleExport}
        />
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
      </div>
    </div>
  );
}

export default App;

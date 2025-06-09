import React, { useState, useRef, useCallback, useEffect } from 'react';
import { toPng } from 'html-to-image';
import { Controls } from './components/Controls';
import { Preview } from './components/Preview';
import { ExportPreview } from './components/ExportPreview';

function App() {
  const [screens, setScreens] = useState([
    {
      id: Date.now(),
      screenshot: null,
      title: 'Your App Title',
      subtitle: 'Your subtitle here',
      textAlign: 'center',
      bgStyle: 'bg-white',
      layout: 'default'
    }
  ]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const exportRef = useRef(null);
  const previewRefs = useRef([]);

  const activeScreen = screens[activeIndex];

  const updateActiveScreen = (updates) => {
    setScreens((prev) => {
      const updated = [...prev];
      updated[activeIndex] = { ...updated[activeIndex], ...updates };
      return updated;
    });
  };

  const handleImageUpload = useCallback((e) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      updateActiveScreen({ screenshot: imageUrl });
    }
  }, [activeIndex]);

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
  }, [activeIndex]);

  const addNewScreen = () => {
    setScreens((prev) => {
      const updatedScreens = [
        ...prev,
        {
          id: Date.now(),
          screenshot: null,
          title: 'New Screen',
          subtitle: 'Edit subtitle',
          textAlign: 'center',
          bgStyle: 'bg-white',
          layout: 'default'
        }
      ];
      setTimeout(() => {
        setActiveIndex(updatedScreens.length - 1);
        const ref = previewRefs.current[updatedScreens.length - 1];
        if (ref) ref.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 0);
      return updatedScreens;
    });
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  useEffect(() => {
    const ref = previewRefs.current[activeIndex];
    if (ref) ref.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [activeIndex]);

  return (
    <div className="min-h-screen h-screen bg-gray-100 flex flex-col overflow-hidden">
      <header className="p-6 border-b border-gray-300 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold text-blue-700">PreviewKit</h1>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-sm bg-gray-200 hover:bg-gray-300 text-gray-800 px-2 py-1 rounded"
          >
            {sidebarOpen ? 'Hide Sidebar' : 'Show Sidebar'}
          </button>
        </div>
        <button
          onClick={addNewScreen}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
        >
          + Add Screen
        </button>
      </header>
      <div className="flex flex-1 overflow-hidden">
        {sidebarOpen && (
          <aside className="w-80 bg-gradient-to-b from-white to-gray-50 p-6 border-r border-gray-200 overflow-y-auto shadow-md">
            <div className="space-y-2 mb-6 max-h-64 overflow-y-auto">
              {screens.map((screen, idx) => (
                <button
                  key={screen.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`block w-full text-left px-3 py-2 rounded text-sm font-medium truncate ${idx === activeIndex ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
                >
                  {screen.title || `Screen ${idx + 1}`}
                </button>
              ))}
            </div>
            <Controls
              bgStyle={activeScreen.bgStyle}
              setBgStyle={(val) => updateActiveScreen({ bgStyle: val })}
              textAlign={activeScreen.textAlign}
              setTextAlign={(val) => updateActiveScreen({ textAlign: val })}
              layout={activeScreen.layout}
              setLayout={(val) => updateActiveScreen({ layout: val })}
              handleImageUpload={handleImageUpload}
              handleExport={handleExport}
            />
          </aside>
        )}

        {/* Main Canvas Area */}
        <main className="flex-1 overflow-y-auto">
          <div className="flex flex-col space-y-10 py-10">
            {screens.map((screen, idx) => (
              <div
                key={screen.id}
                ref={(el) => (previewRefs.current[idx] = el)}
                className={`transition-transform duration-300 ${idx === activeIndex ? 'scale-100' : 'scale-95 opacity-50'}`}
                onClick={() => setActiveIndex(idx)}
              >
                <Preview
                  title={screen.title}
                  setTitle={(val) => idx === activeIndex && updateActiveScreen({ title: val })}
                  subtitle={screen.subtitle}
                  setSubtitle={(val) => idx === activeIndex && updateActiveScreen({ subtitle: val })}
                  screenshot={screen.screenshot}
                  textAlign={screen.textAlign}
                  bgStyle={screen.bgStyle}
                  layout={screen.layout}
                />
                {idx === activeIndex && (
                  <ExportPreview
                    exportRef={exportRef}
                    title={screen.title}
                    subtitle={screen.subtitle}
                    screenshot={screen.screenshot}
                    textAlign={screen.textAlign}
                    bgStyle={screen.bgStyle}
                    layout={screen.layout}
                  />
                )}
              </div>
            ))}
          </div>
        </main>
      </div>

    </div>
  );
}

export default App;

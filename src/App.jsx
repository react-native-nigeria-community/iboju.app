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
      customBg: null,
      layout: 'default'
    }
  ]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);   // Pages
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true); // Settings
  const [screenSearch, setScreenSearch] = useState('');

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

  const handleImageUpload = useCallback(
    (e) => {
      const file = e.target.files?.[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        updateActiveScreen({ screenshot: imageUrl });
      }
    },
    [activeIndex]
  );

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
        height: 2796
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
          customBg: null,
          layout: 'default'
        }
      ];
      setTimeout(() => {
        setActiveIndex(updatedScreens.length - 1);
        const ref = previewRefs.current[updatedScreens.length - 1];
        if (ref) ref.scrollIntoView({ behavior: 'smooth', inline: 'center' });
      }, 0);
      return updatedScreens;
    });
  };

  const deleteScreen = (id) => {
    setScreens((prev) => {
      if (prev.length === 1) return prev; // don't delete last one

      const index = prev.findIndex((s) => s.id === id);
      if (index === -1) return prev;

      const newScreens = prev.filter((s) => s.id !== id);

      let newActive = activeIndex;
      if (index < activeIndex) {
        newActive = activeIndex - 1;
      } else if (index === activeIndex) {
        newActive = Math.max(0, activeIndex - 1);
      }
      setActiveIndex(newActive);

      return newScreens;
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
    if (ref) {
      ref.scrollIntoView({ behavior: 'smooth', inline: 'center' });
    }
  }, [activeIndex]);

  const matchesSearch = (screen) => {
    if (!screenSearch.trim()) return true;
    const q = screenSearch.toLowerCase();
    return (
      (screen.title || '').toLowerCase().includes(q) ||
      (screen.subtitle || '').toLowerCase().includes(q)
    );
  };

  return (
    <div className="min-h-screen h-screen bg-gray-100 flex flex-col overflow-hidden">
      {/* HEADER */}
      <header className="p-6 border-b border-gray-300 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold text-blue-700">PreviewKit</h1>

          {/* Toggle Pages (left sidebar) */}
          <button
            onClick={() => setLeftSidebarOpen((prev) => !prev)}
            className={`text-sm px-3 py-1 rounded ${leftSidebarOpen
              ? 'bg-gray-800 text-white'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
          >
            Pages
          </button>

          {/* Toggle Settings (right sidebar) */}
          <button
            onClick={() => setRightSidebarOpen((prev) => !prev)}
            className={`text-sm px-3 py-1 rounded ${rightSidebarOpen
              ? 'bg-gray-800 text-white'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
          >
            Settings
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExport}
            className="text-sm bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
          >
            Export PNG
          </button>

          <button
            onClick={addNewScreen}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
          >
            + Add Screen
          </button>
        </div>
      </header>

      {/* BODY LAYOUT */}
      <div className="flex flex-1 overflow-hidden h-full">
        {/* LEFT PAGES SIDEBAR */}
        {leftSidebarOpen && (
          <aside className="w-64 bg-gray-900 text-gray-100 p-4 border-r border-gray-800 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <span className="font-semibold text-sm uppercase tracking-wide">
                Pages
              </span>
              <button
                onClick={addNewScreen}
                className="w-6 h-6 flex items-center justify-center rounded bg-gray-700 hover:bg-gray-600 text-sm"
                title="Add Screen"
              >
                +
              </button>
            </div>

            {/* Search */}
            <div className="mb-4">
              <input
                type="text"
                value={screenSearch}
                onChange={(e) => setScreenSearch(e.target.value)}
                placeholder="Search screens..."
                className="w-full text-sm bg-gray-800 border border-gray-700 rounded px-2 py-1 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Screens list */}
            <div className="flex-1 overflow-y-auto space-y-1">
              {screens.map((screen, idx) => {
                if (!matchesSearch(screen)) return null;
                const isActive = idx === activeIndex;
                return (
                  <div
                    key={screen.id}
                    className={`flex items-center justify-between text-sm rounded px-2 py-1 cursor-pointer ${isActive ? 'bg-gray-700 text-white' : 'hover:bg-gray-800'
                      }`}
                    onClick={() => setActiveIndex(idx)}
                  >
                    <span className="truncate">
                      {screen.title || `Screen ${idx + 1}`}
                    </span>
                    {screens.length > 1 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteScreen(screen.id);
                        }}
                        className="ml-2 text-xs text-gray-300 hover:text-red-400"
                        title="Delete screen"
                      >
                        🗑
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </aside>
        )}

        {/* CANVAS */}
        <main className="flex-1 overflow-x-auto overflow-y-hidden whitespace-nowrap pt-10">
          <div className="flex flex-row space-x-14 px-10">
            {screens.map((screen, idx) => (
              <div
                key={screen.id}
                ref={(el) => (previewRefs.current[idx] = el)}
                className={`transition-transform duration-300 inline-block align-top ${idx === activeIndex ? 'scale-100' : 'scale-95 opacity-50'
                  }`}
                onClick={() => setActiveIndex(idx)}
              >
                {/* Fixed-size wrapper so absolute content inside preview stays stable */}
                <div className="w-[350px] h-[700px] relative mt-10">

                  <Preview
                    title={screen.title}
                    setTitle={(val) =>
                      idx === activeIndex &&
                      updateActiveScreen({ title: val })
                    }
                    subtitle={screen.subtitle}
                    setSubtitle={(val) =>
                      idx === activeIndex &&
                      updateActiveScreen({ subtitle: val })
                    }
                    screenshot={screen.screenshot}
                    textAlign={screen.textAlign}
                    bgStyle={screen.bgStyle}
                    customBg={screen.customBg}
                    layout={screen.layout}
                  />
                </div>

                {idx === activeIndex && (
                  <ExportPreview
                    exportRef={exportRef}
                    title={screen.title}
                    subtitle={screen.subtitle}
                    screenshot={screen.screenshot}
                    textAlign={screen.textAlign}
                    bgStyle={screen.bgStyle}
                    customBg={screen.customBg}
                    layout={screen.layout}
                  />
                )}
              </div>
            ))}
          </div>
        </main>

        {/* RIGHT SETTINGS SIDEBAR */}
        {rightSidebarOpen && (
          <aside className="w-80 bg-gradient-to-b from-white to-gray-50 p-6 border-l border-gray-200 overflow-y-auto shadow-md">
            <Controls
              bgStyle={activeScreen.bgStyle}
              customBg={activeScreen.customBg}
              textAlign={activeScreen.textAlign}
              layout={activeScreen.layout}
              setBgStyle={(val) => updateActiveScreen(val)}
              setTextAlign={(val) => updateActiveScreen(val)}
              setLayout={(val) => updateActiveScreen(val)}
              handleImageUpload={handleImageUpload}
            />
          </aside>
        )}
      </div>
    </div>
  );
}

export default App;

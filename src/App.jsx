import React, { useState, useRef, useCallback, useEffect } from "react";
import { toPng } from "html-to-image";
import { Controls } from "./components/Controls";
import { Preview } from "./components/Preview";
import { ExportPreview } from "./components/ExportPreview";
import LeftSidebar from "./components/LeftSidebar";
import RightSidebar from "./components/RightSidebar";
import JSZip from "jszip";
import { saveAs } from "file-saver";

/* -------------------------
   DEVICE BLOCKER (MOBILE WALL)
-------------------------- */
function isAllowedDevice() {
  const ua = navigator.userAgent.toLowerCase();

  const isTouch = navigator.maxTouchPoints > 1;

  const isMobile =
    /iphone|android|ipod|opera mini|blackberry|windows phone/i.test(ua);

  // Detect iPad correctly in modern iOS
  const isiPad =
    /ipad/.test(ua) ||
    (isTouch && /macintosh/.test(ua)); // iPads pretend to be Macs on Safari

  if (isiPad) return true;     // allow iPad
  if (isMobile) return false;  // block phones
  if (isTouch && !isiPad) return false; // block big phones/tablets if needed

  return true; // allow desktop/laptop
}


function App() {
  const [screens, setScreens] = useState([
    {
      id: Date.now(),
      screenshot: null,
      title: "Your App Title",
      subtitle: "Your subtitle here",
      textAlign: "center",
      bgStyle: "bg-white",
      customBg: null,
      layout: "default",
    },
  ]);

  const [activeIndex, setActiveIndex] = useState(0);

  // shared collapse state
  const [sidebarsCollapsed, setSidebarsCollapsed] = useState(false);

  const exportRef = useRef(null);
  const previewRefs = useRef([]);

  const activeScreen = screens[activeIndex];


  /* -------------------------
      DOWNLOAD COUNTER
  -------------------------- */
  const [downloadCount, setDownloadCount] = useState(1); // example starting point


  const updateActiveScreen = (updates) => {
    setScreens((prev) => {
      const updated = [...prev];
      updated[activeIndex] = { ...updated[activeIndex], ...updates };
      return updated;
    });
  };


  /* -------------------------
       IMAGE UPLOAD
  -------------------------- */
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


  /* ---------------------------------
      EXPORT SINGLE SCREEN
  ---------------------------------- */
  const handleExport = useCallback(async () => {
    if (!exportRef.current) return;

    setDownloadCount((prev) => prev + 1); // ⬅ update download counter

    const exportNode = exportRef.current.cloneNode(true);
    exportNode.style.width = "1290px";
    exportNode.style.height = "2796px";

    const container = document.createElement("div");
    container.style.position = "absolute";
    container.style.left = "-9999px";
    container.style.top = "0";
    container.appendChild(exportNode);
    document.body.appendChild(container);

    try {
      const dataUrl = await toPng(exportNode, {
        width: 1290,
        height: 2796,
      });

      const link = document.createElement("a");
      link.download = "preview.png";
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Export failed:", err);
    } finally {
      document.body.removeChild(container);
    }
  }, [activeIndex]);


  /* ---------------------------------
      EXPORT *ALL* SCREENS (ZIP)
  ---------------------------------- */
  const handleExportAll = useCallback(async () => {
    if (screens.length === 0) return;

    setDownloadCount((prev) => prev + 1); // count this too

    const originalIndex = activeIndex;
    const zip = new JSZip();

    for (let i = 0; i < screens.length; i++) {
      setActiveIndex(i);
      await new Promise((resolve) => setTimeout(resolve, 160));

      if (!exportRef.current) continue;

      const exportNode = exportRef.current.cloneNode(true);
      exportNode.style.width = "1290px";
      exportNode.style.height = "2796px";

      const container = document.createElement("div");
      container.style.position = "absolute";
      container.style.left = "-9999px";
      container.style.top = "0";
      container.appendChild(exportNode);
      document.body.appendChild(container);

      try {
        const dataUrl = await toPng(exportNode, { width: 1290, height: 2796 });
        const base64 = dataUrl.split(",")[1];
        zip.file(`screen-${i + 1}.png`, base64, { base64: true });
      } catch (err) {
        console.error("Failed exporting screen:", err);
      } finally {
        document.body.removeChild(container);
      }
    }

    setActiveIndex(originalIndex);

    const zipFile = await zip.generateAsync({ type: "blob" });
    saveAs(zipFile, "screens.zip");
  }, [activeIndex, screens.length]);


  const addNewScreen = () =>
    setScreens((prev) => [
      ...prev,
      {
        id: Date.now(),
        screenshot: null,
        title: "New Screen",
        subtitle: "Edit subtitle",
        textAlign: "center",
        bgStyle: "bg-white",
        customBg: null,
        layout: "default",
      },
    ]);


  /* -------------------------
        DELETE SCREEN
  -------------------------- */
  const deleteScreen = (id) => {
    setScreens((prev) => {
      if (prev.length === 1) return prev;

      const index = prev.findIndex((s) => s.id === id);
      if (index === -1) return prev;

      const newScreens = prev.filter((s) => s.id !== id);

      let newActive = activeIndex;
      if (index < activeIndex) newActive = activeIndex - 1;
      else if (index === activeIndex) newActive = Math.max(0, activeIndex - 1);

      setActiveIndex(newActive);
      return newScreens;
    });
  };


  /* -------------------------
      SCROLL ACTIVE PREVIEW
  -------------------------- */
  useEffect(() => {
    const ref = previewRefs.current[activeIndex];
    if (ref) ref.scrollIntoView({ behavior: "smooth", inline: "center" });
  }, [activeIndex]);


  /* ===========================================================
     🚨 MOBILE DEVICE BLOCKER — FULLSCREEN WALL
  ============================================================ */
  if (!isAllowedDevice()) {
    return (
      <div className="w-screen h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6 text-center">
        <h1 className="text-3xl font-bold mb-4">Unsupported Device</h1>
        <p className="text-lg opacity-80 max-w-md">
          PreviewKit is only available on iPad and Desktop browsers.
          <br />
          Please switch to a larger device to continue.
        </p>
      </div>
    );
  }


  /* ===========================================================
     NORMAL APP LAYOUT (ALLOWED DEVICES ONLY)
  ============================================================ */
  return (
    <div className="min-h-screen h-screen bg-gray-100 flex flex-col overflow-hidden">

      {/* HEADER */}
      <header className="px-4 py-2 border-b border-gray-300 flex justify-between items-center">

        {/* LEFT SIDE: Logo + Version */}
        <h1 className="text-3xl font-bold text-blue-700 flex items-center gap-3">
          PreviewKit

          {/* VERSION BADGE */}
          <span className="px-2 py-0.5 text-xs rounded bg-blue-100 text-blue-700 font-semibold">
            v0.1
          </span>
        </h1>

        {/* RIGHT SIDE: GitHub + Download Count */}
        <div className="flex items-center gap-4">

          {/* DOWNLOAD COUNT */}
          <span className="text-gray-600 text-sm bg-gray-200 px-3 py-1 rounded-full">
            {downloadCount.toLocaleString()} downloads
          </span>

          {/* GITHUB ICON */}
          <a
            href="https://github.com/just1and0"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-black"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 19c-4 1-4-2-6-2m12 2v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0018 3.77 5.07 5.07 0 0017.91 1S16.73.65 14 2.48a13.38 13.38 0 00-5 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 3.77a5.44 5.44 0 00-1.5 3.7c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 15.13V19"
              />
            </svg>
          </a>
        </div>
      </header>



      {/* BODY */}
      <div className="flex flex-1 overflow-hidden">

        <LeftSidebar
          screens={screens}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          addNewScreen={addNewScreen}
          deleteScreen={deleteScreen}
          sidebarsCollapsed={sidebarsCollapsed}
          setSidebarsCollapsed={setSidebarsCollapsed}
        />

        <main className="flex-1 overflow-x-auto overflow-y-hidden whitespace-nowrap pt-10">
          <div className="flex flex-row space-x-14 px-10">
            {screens.map((screen, idx) => (
              <div
                key={screen.id}
                ref={(el) => (previewRefs.current[idx] = el)}
                className={`transition-transform duration-300 inline-block align-top ${idx === activeIndex ? "scale-100" : "scale-95 opacity-50"
                  }`}
                onClick={() => setActiveIndex(idx)}
              >
                <div className="w-[350px] h-[700px] relative mt-20">
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

        <RightSidebar
          sidebarsCollapsed={sidebarsCollapsed}
          setSidebarsCollapsed={setSidebarsCollapsed}
          onExportCurrent={handleExport}
          onExportAll={handleExportAll}
        >
          <Controls
            bgStyle={activeScreen.bgStyle}
            customBg={activeScreen.customBg}
            textAlign={activeScreen.textAlign}
            layout={activeScreen.layout}
            setBgStyle={(style) =>
              updateActiveScreen({ bgStyle: style, customBg: null })
            }
            setCustomBg={(color) =>
              updateActiveScreen({ customBg: color, bgStyle: "" })
            }
            setTextAlign={(align) =>
              updateActiveScreen({ textAlign: align })
            }
            setLayout={(layout) =>
              updateActiveScreen({ layout })
            }
            handleImageUpload={handleImageUpload}
          />
        </RightSidebar>

      </div>
    </div>
  );
}

export default App;

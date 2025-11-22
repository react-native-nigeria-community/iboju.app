// src/App.tsx
import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  ChangeEvent,
} from "react";
import { toPng } from "html-to-image";
import { Controls } from "./components/Controls";
import { Preview } from "./components/Preview";
import { ExportPreview } from "./components/ExportPreview";
import LeftSidebar from "./components/LeftSidebar/LeftSidebar";
import RightSidebar from "./components/RightSidebar";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { ScreenItem } from "./global";
import { isAllowedDevice } from "./utils";
import { NEW_SCREEN_TEMPLATE } from "./constants";

const App: React.FC = () => {
  const [screens, setScreens] = useState<ScreenItem[]>([NEW_SCREEN_TEMPLATE]);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [sidebarsCollapsed, setSidebarsCollapsed] = useState<boolean>(false);

  const exportRef = useRef<HTMLDivElement | null>(null);
  const previewRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [downloadCount, setDownloadCount] = useState<number>(1);

  const activeScreen = screens[activeIndex];

  const updateActiveScreen = useCallback(
    (updates: Partial<ScreenItem>) => {
      setScreens((prev) => {
        const updated = [...prev];
        if (!updated[activeIndex]) return prev;
        updated[activeIndex] = { ...updated[activeIndex], ...updates };
        return updated;
      });
    },
    [activeIndex]
  );

  useEffect(() => {
  const fetchCount = async () => {
    try {
      const res = await fetch("/api/get");
      const data = await res.json();
      setDownloadCount(data.count);
    } catch (err) {
      console.error(err);
    }
  };

  fetchCount();
}, []);

const incrementDownload = async (amount = 1) => {
  try {
    const res = await fetch("/api/set", { 
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount })
    });

    const data = await res.json();
    setDownloadCount(data.count);
  } catch {
    console.log("Failed to increment, applying fallback.");
    setDownloadCount((prev) => prev + amount);
  }
};


  /* -------------------------
       IMAGE UPLOAD
  -------------------------- */
  const handleImageUpload = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        updateActiveScreen({ screenshot: imageUrl });
      }
    },
    [updateActiveScreen]
  );

  /* ---------------------------------
      EXPORT SINGLE SCREEN
  ---------------------------------- */
const handleExport = useCallback(async () => {
  if (!exportRef.current) return;

  setDownloadCount((prev) => prev + 1);

  // Save to Redis
  incrementDownload(1);

  const exportNode = exportRef.current.cloneNode(true) as HTMLElement;
  exportNode.style.width = "1290px";
  exportNode.style.height = "2796px";

  const container = document.createElement("div");
  container.style.position = "absolute";
  container.style.left = "-9999px";
  container.appendChild(exportNode);
  document.body.appendChild(container);

  try {
    const dataUrl = await toPng(exportNode, { width: 1290, height: 2796 });

    const link = document.createElement("a");
    link.download = "preview.png";
    link.href = dataUrl;
    link.click();
  } catch (err) {
    console.error("Export failed:", err);
  } finally {
    document.body.removeChild(container);
  }
}, []);


  /* ---------------------------------
      EXPORT ALL SCREENS (ZIP)
  ---------------------------------- */
const handleExportAll = useCallback(async () => {
  if (screens.length === 0) return;

  const countToAdd = screens.length;

  // UI update
  setDownloadCount((prev) => prev + countToAdd);

  // Save to Redis
  incrementDownload(countToAdd);

  const originalIndex = activeIndex;
  const zip = new JSZip();

  for (let i = 0; i < screens.length; i++) {
    setActiveIndex(i);
    await new Promise((resolve) => setTimeout(resolve, 160));

    if (!exportRef.current) continue;

    const exportNode = exportRef.current.cloneNode(true) as HTMLElement;
    exportNode.style.width = "1290px";
    exportNode.style.height = "2796px";

    const container = document.createElement("div");
    container.style.position = "absolute";
    container.style.left = "-9999px";
    container.appendChild(exportNode);
    document.body.appendChild(container);

    try {
      const dataUrl = await toPng(exportNode, { width: 1290, height: 2796 });
      const base64 = dataUrl.split(",")[1];
      zip.file(`screen-${i + 1}.png`, base64, { base64: true });
    } catch (err) {
      console.error("Exporting screen failed:", err);
    } finally {
      document.body.removeChild(container);
    }
  }

  setActiveIndex(originalIndex);

  const zipFile = await zip.generateAsync({ type: "blob" });
  saveAs(zipFile, "screens.zip");
}, [activeIndex, screens.length]);


  /* -------------------------
      ADD SCREEN
  -------------------------- */
  const addNewScreen = useCallback(() => {
    setScreens((prev) => {
      const next: ScreenItem[] = [
        ...prev,
        {
          ...NEW_SCREEN_TEMPLATE,
          id: Date.now(),
        },
      ];
      setActiveIndex(next.length - 1);
      return next;
    });
  }, []);

  /* -------------------------
      DELETE SCREEN
  -------------------------- */
  const deleteScreen = (id: number) => {
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
      AUTO TEXT COLOR ON PRESET CHANGE
  -------------------------- */
  const handlePresetChange = useCallback(
    (preset: string) => {
      setScreens((prev) => {
        const next = [...prev];
        const current = next[activeIndex];
        if (!current) return prev;

        // only auto-change if user has NOT customized text colors
        if (!current.isTextColorCustom) {
          const isDarkPreset = preset.includes("bg-gray-800");
          const titleColor = isDarkPreset ? "#F9FAFB" : "#111827";
          const subtitleColor = isDarkPreset ? "#E5E7EB" : "#4B5563";

          next[activeIndex] = {
            ...current,
            titleColor,
            subtitleColor,
          };
        }

        return next;
      });
    },
    [activeIndex]
  );

  /* -------------------------
      SCROLL ACTIVE PREVIEW
  -------------------------- */
  useEffect(() => {
    const ref = previewRefs.current[activeIndex];
    if (ref) ref.scrollIntoView({ behavior: "smooth", inline: "center" });
  }, [activeIndex]);

  /* ===========================================================
     🚨 DEVICE BLOCKER
  ============================================================ */
  if (!isAllowedDevice()) {
    return (
      <div className="w-screen h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6 text-center">
        <h1 className="text-3xl font-bold mb-4">Unsupported Device</h1>
        <p className="text-lg opacity-80 max-w-md">
          Iboju is only available on iPad and Desktop browsers.
          <br />
          Please switch to a larger device to continue.
        </p>
      </div>
    );
  }

  /* ===========================================================
     NORMAL UI
  ============================================================ */
  return (
    <div className="min-h-screen h-screen bg-gray-100 flex flex-col overflow-hidden">
      {/* HEADER */}
      <header className="px-4 py-2 border-b border-gray-300 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-blue-700 flex items-center gap-3">
          Iboju
          <span className="px-2 py-0.5 text-xs rounded bg-blue-100 text-blue-700 font-semibold">
            v0.1
          </span>
        </h1>

        <div className="flex items-center gap-4">
          <span className="text-gray-600 text-sm bg-gray-200 px-3 py-1 rounded-full">
            {downloadCount.toLocaleString()} downloads
          </span>

          <a
            href="https://github.com/react-native-nigeria-community/iboju.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-black"
          >
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12 .297a12 12 0 00-3.79 23.4c.6.11.82-.26.82-.58v-2.17c-3.34.73-4.04-1.61-4.04-1.61a3.18 3.18 0 00-1.34-1.76c-1.1-.75.08-.74.08-.74a2.52 2.52 0 011.84 1.24 2.56 2.56 0 003.44 1 2.56 2.56 0 01.76-1.61c-2.67-.3-5.47-1.34-5.47-5.95a4.66 4.66 0 011.24-3.23 4.32 4.32 0 01.12-3.19s1-.32 3.3 1.23a11.38 11.38 0 016 0c2.3-1.55 3.29-1.23 3.29-1.23a4.32 4.32 0 01.12 3.19 4.66 4.66 0 011.24 3.23c0 4.63-2.81 5.65-5.49 5.95a2.88 2.88 0 01.82 2.23v3.3c0 .32.21.69.82.58A12 12 0 0012 .297z"
                clipRule="evenodd"
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
                ref={(el) => {
                  previewRefs.current[idx] = el;
                }}
                className={`transition-transform duration-300 inline-block align-top ${idx === activeIndex
                  ? "scale-100"
                  : "scale-95 opacity-50"
                  }`}
                onClick={() => setActiveIndex(idx)}
              >
                <div className="w-[350px] h-[700px] relative mt-20">
                  <Preview
                    title={screen.title}
                    setTitle={(val: string | null) => {
                      if (idx === activeIndex && val !== null) {
                        updateActiveScreen({ title: val });
                      }
                    }}
                    subtitle={screen.subtitle}
                    setSubtitle={(val: string | null) => {
                      if (idx === activeIndex && val !== null) {
                        updateActiveScreen({ subtitle: val });
                      }
                    }}
                    screenshot={screen.screenshot}
                    textAlign={screen.textAlign}
                    bgStyle={screen.bgStyle}
                    customBg={screen.customBg}
                    layout={screen.layout}
                    titleColor={screen.titleColor}
                    subtitleColor={screen.subtitleColor}
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
                    titleColor={screen.titleColor}
                    subtitleColor={screen.subtitleColor}
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
          {activeScreen && (
            <Controls
              bgStyle={activeScreen.bgStyle}
              customBg={activeScreen.customBg}
              textAlign={activeScreen.textAlign}
              layout={activeScreen.layout}
              titleColor={activeScreen.titleColor}
              subtitleColor={activeScreen.subtitleColor}
              isTextColorCustom={activeScreen.isTextColorCustom}
              setBgStyle={(style: string) =>
                updateActiveScreen({ bgStyle: style, customBg: null })
              }
              setCustomBg={(color: string | null) =>
                updateActiveScreen({ customBg: color, bgStyle: "" })
              }
              setTextAlign={(align: "left" | "center" | "right") =>
                updateActiveScreen({ textAlign: align })
              }
              setLayout={(layout: "default" | "inverted") =>
                updateActiveScreen({ layout })
              }
              setTitleColor={(color: string) =>
                updateActiveScreen({
                  titleColor: color,
                  isTextColorCustom: true,
                })
              }
              setSubtitleColor={(color: string) =>
                updateActiveScreen({
                  subtitleColor: color,
                  isTextColorCustom: true,
                })
              }
              setIsTextColorCustom={(isCustom: boolean) =>
                updateActiveScreen({ isTextColorCustom: isCustom })
              }
              onPresetChange={handlePresetChange}
              handleImageUpload={handleImageUpload}
            />
          )}
        </RightSidebar>
      </div>
    </div>
  );
};

export default App;

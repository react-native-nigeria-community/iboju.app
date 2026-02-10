import React, { useRef, useEffect } from "react";
import { en } from "../i18n/en";

export interface PreviewProps {
  title: string;
  setTitle: (value: string | null) => void;
  subtitle: string;
  setSubtitle: (value: string | null) => void;
  screenshot: string | null;
  textAlign: "left" | "center" | "right";
  bgStyle: string;
  customBg: string | null;
  layout: "default" | "inverted";
  titleColor: string;
  subtitleColor: string;
  device: "mobile" | "tablet" | "desktop";
}

export const Preview: React.FC<PreviewProps> = ({
  title,
  setTitle,
  subtitle,
  setSubtitle,
  screenshot,
  textAlign,
  bgStyle,
  customBg,
  layout,
  titleColor,
  subtitleColor,
  device,
}) => {
  const isInverted = layout === "inverted";

  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    if (titleRef.current && titleRef.current.textContent !== title) {
      titleRef.current.textContent = title || "";
    }
  }, [title, layout]);

  useEffect(() => {
    if (subtitleRef.current && subtitleRef.current.textContent !== subtitle) {
      subtitleRef.current.textContent = subtitle || "";
    }
  }, [subtitle, layout]);

  const titleStyle: React.CSSProperties = {
    textAlign,
    color: titleColor,
  };

  const subtitleStyle: React.CSSProperties = {
    textAlign,
    color: subtitleColor,
  };

  const renderMobileFrame = () => (
  <div className="bg-black rounded-[32px] p-2 border-4 border-black shadow-md">
    <div className="w-[220px] h-[440px] bg-white rounded-[24px] overflow-hidden relative flex items-center justify-center">
      {/* notch */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-3 bg-black rounded-b-xl z-10" />
      {screenshot ? (
        <img src={screenshot} alt="Preview" className={`${isInverted ? "rotate-180" : ""} w-full`} />
      ) : (
        <span className="text-gray-400 text-sm text-center">No screenshot</span>
      )}
    </div>
  </div>
);

const renderTabletFrame = () => (
  <div className="bg-[black] rounded-xl p-3 shadow-md">
    <div className="w-[420px] h-[560px] bg-white rounded-[20px] overflow-hidden relative flex items-center justify-center">
      {/* camera */}
      <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-[black] rounded-xl z-10"/>
      {screenshot ? (
        <img src={screenshot} alt="Preview" className={`${isInverted ? "rotate-180" : ""} w-full`} />
      ) : (
        <span className="text-gray-400 text-sm text-center">No screenshot</span>
      )}
    </div>
  </div>
);

const renderDesktopFrame = () => (
  <div className="bg-black rounded-lg p-4 shadow-lg">
    <div className="w-[900px] h-[520px] bg-white rounded-md flex items-center justify-center relative">
      {/* base */}
      <div className="absolute -bottom-7 left-1/2 transform -translate-x-1/2 w-[480px] h-3 bg-black rounded-b-md z-30" />
      
      {screenshot ? (
        <img src={screenshot} alt="Preview" className={`${isInverted ? "rotate-180" : ""} w-full`} />
      ) : (
        <span className="text-gray-400 text-sm text-center">No screenshot</span>
      )}
    </div>
  </div>
);

const renderDeviceFrame = () => {
  switch (device) {
    case "mobile":
      return renderMobileFrame();
    case "tablet":
      return renderTabletFrame();
    case "desktop":
      return renderDesktopFrame();
    default:
      return renderMobileFrame();
  }
};

  return (
    <div className="flex-1">
      <div
        className={`relative w-full max-w-[1200px] mx-auto p-6 rounded-xl shadow-xl flex flex-col ${
          customBg ? "" : bgStyle
        } h-[700px] overflow-hidden`}
        style={{
          textAlign,
          background: customBg || undefined,
        }}
      >
        {/* TITLE + SUBTITLE (default layout) */}
        {!isInverted && (
          <div className="flex flex-col gap-2">
            <h2
              ref={titleRef}
              contentEditable
              suppressContentEditableWarning
              dir="ltr"
              onInput={(e) => setTitle(e.currentTarget.textContent)}
              className="text-xl font-bold outline-none"
              style={titleStyle}
            />

            <p
              ref={subtitleRef}
              contentEditable
              suppressContentEditableWarning
              dir="ltr"
              onInput={(e) => setSubtitle(e.currentTarget.textContent)}
              className="outline-none"
              style={subtitleStyle}
            />
          </div>
        )}

        {/* PHONE MOCKUP */}
        <div className="flex justify-center items-center flex-1">
          {renderDeviceFrame()}
        </div>

        {/* TITLE + SUBTITLE (inverted layout) */}
        {isInverted && (
          <div className="flex flex-col gap-2 mt-4">
            <h2
              ref={titleRef}
              contentEditable
              suppressContentEditableWarning
              dir="ltr"
              onInput={(e) => setTitle(e.currentTarget.textContent)}
              className="text-xl font-bold outline-none"
              style={titleStyle}
            />

            <p
              ref={subtitleRef}
              contentEditable
              suppressContentEditableWarning
              dir="ltr"
              onInput={(e) => setSubtitle(e.currentTarget.textContent)}
              className="outline-none"
              style={subtitleStyle}
            />
          </div>
        )}
      </div>
    </div>
  );
};

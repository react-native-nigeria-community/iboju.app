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
  deviceStyle: "flat" | "3d";
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
  deviceStyle,
}) => {
  const isInverted = layout === "inverted";
  const is3D = deviceStyle === "3d";

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

  return (
    <div className="flex-1">
      <div
        className={`relative w-full max-w-md mx-auto p-6 rounded-xl shadow-xl flex flex-col ${
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
          <div
            className={`${is3D ? "bg-black rounded-[32px] p-2 border-4 border-black shadow-md" : ""}`}
          >
            <div
              className={`w-[220px] h-[440px] bg-white ${is3D ? "rounded-[24px]" : "rounded-lg border-2 border-gray-300 shadow-lg"} overflow-hidden relative flex items-center justify-center`}
            >
              {/* notch - only show in 3D mode */}
              {is3D && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-3 bg-black rounded-b-xl z-10" />
              )}

              {screenshot ? (
                <img
                  src={screenshot}
                  alt={en.preview.altScreenshot}
                  className={`w-full ${isInverted ? "rotate-180" : ""}`}
                />
              ) : (
                <span className="text-gray-400 text-sm text-center">
                  {en.preview.noScreenshot}
                </span>
              )}
            </div>
          </div>
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

import React, { useRef, useEffect } from "react";
import { en } from "../i18n/en";
import { DeviceConfig, PositionPreset } from "../global";

// Presets that need the canvas to NOT clip the device
const BLEED_PRESETS: PositionPreset[] = ["bleed-bottom", "bleed-top"];

// Style applied to the device wrapper div
const DEVICE_WRAPPER_STYLES: Record<PositionPreset, React.CSSProperties> = {
  "centered":     {},
  "bleed-bottom": { transform: "translateY(30%)" },
  "bleed-top":    { transform: "translateY(-30%)" },
  "float-center": {
    transform: "translateY(-12px)",
    filter: "drop-shadow(0 24px 32px rgba(0,0,0,0.35))",
  },
  "float-bottom": {
    transform: "translateY(20px)",
    filter: "drop-shadow(0 24px 32px rgba(0,0,0,0.35))",
  },
  "tilt-left":    { transform: "rotate(-8deg) translateY(-8px)" },
  "tilt-right":   { transform: "rotate(8deg) translateY(-8px)" },
  "perspective":  { transform: "perspective(600px) rotateY(12deg)" },
};

// Alignment of the flex container holding the device
const DEVICE_CONTAINER_ALIGN: Record<PositionPreset, string> = {
  "centered":     "items-center",
  "bleed-bottom": "items-end",
  "bleed-top":    "items-start",
  "float-center": "items-center",
  "float-bottom": "items-end",
  "tilt-left":    "items-center",
  "tilt-right":   "items-center",
  "perspective":  "items-center",
};

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
  device: DeviceConfig;
  positionPreset: PositionPreset;
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
  positionPreset,
}) => {
  const isInverted = layout === "inverted";
  const isBleed = BLEED_PRESETS.includes(positionPreset);

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

const renderDeviceFrame = () => {
  const { frame, screen, extras } = device;

  return (
    <div
      className="bg-black shadow-md"
      style={{
        borderRadius: frame.radius,
        padding: frame.padding,
      }}
    >
      <div
        className="bg-white relative  flex items-center justify-center"
        style={{
          width: frame.width,
          height: frame.height,
          borderRadius: frame.radius - 8,
        }}
      >
        {/* NOTCH */}
        {extras === "notch" && (
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-3 bg-black rounded-b-xl z-10" />
        )}

        {/* CAMERA */}
        {extras === "camera" && (
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-3 h-3 bg-black rounded-full z-10" />
        )}

         {extras === "stand" && (
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-34 h-4 bg-black rounded-b-md z-10" />
          )}

        {/* SCREEN */}
        <div
          className="absolute overflow-hidden"
          style={{
            top: screen.safeTop,
            bottom: screen.safeBottom,
            left: screen.safeLeft,
            right: screen.safeRight,
          }}
        >
          {screenshot ? (
            <img
              src={screenshot}
              alt="Preview"
              className={`w-full h-full object-contain`}
            />
          ) : (
            <span className="text-gray-400 text-sm flex items-center justify-center h-full">
              No screenshot
            </span>
          )}
        </div>
      </div>
    </div>
  );
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
        <div className={`flex justify-center items-center flex-1 ${DEVICE_CONTAINER_ALIGN[positionPreset]}`}>
          <div style={DEVICE_WRAPPER_STYLES[positionPreset]}>
    {renderDeviceFrame()}
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

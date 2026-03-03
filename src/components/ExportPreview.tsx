import React, { useMemo } from "react";
import { ExportPreviewProps, PositionPreset } from "../global";
import { en } from "../i18n/en";
import { POSITION_PRESET_EXPORT_STYLES } from "../utils/presetstyles";


// Derive transform styles dynamically based on scaled frame dimensions
const getExportDeviceStyle = (
  preset: PositionPreset,
  scaledWidth: number,
  scaledHeight: number
): React.CSSProperties => {
  const p = scaledWidth * 4;
  const shadow = `drop-shadow(0 ${scaledHeight * 0.06}px ${scaledHeight * 0.1}px rgba(0,0,0,0.45))`;

  switch (preset) {
    case "centered":     return {};
    case "bleed-bottom": return { transform: "translateY(30%)" };
    case "bleed-top":    return { transform: "translateY(-30%)" };
    case "float-center": return { transform: `translateY(-${scaledHeight * 0.06}px)`, filter: shadow };
    case "float-bottom": return { transform: `translateY(${scaledHeight * 0.05}px)`,  filter: shadow };
    case "tilt-left":    return { transform: "rotate(-8deg) translateY(-8px)" };
    case "tilt-right":   return { transform: "rotate(8deg) translateY(-8px)" };
    case "perspective":  return { transform: `perspective(${p}px) rotateY(12deg)` };
  }
};

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

export const ExportPreview: React.FC<ExportPreviewProps> = ({
  exportRef,
  title,
  subtitle,
  screenshot,
  textAlign,
  bgStyle,
  customBg,
  layout,
  titleColor,
  subtitleColor,
  device,
  positionPreset
}) => {
  const isInverted = layout === "inverted";

  const titleStyle = useMemo(
    () => ({
      unicodeBidi: "plaintext" as const,
      direction: "ltr" as const,
      textAlign,
      color: titleColor,
    }),
    [textAlign, titleColor]
  );

  const subtitleStyle = useMemo(
    () => ({
      unicodeBidi: "plaintext" as const,
      direction: "ltr" as const,
      textAlign,
      color: subtitleColor,
    }),
    [textAlign, subtitleColor]
  );

  const containerStyle = useMemo(
    () => ({
      overflow: "hidden",
      textAlign,
      background: customBg || undefined,
    }),
    [customBg, textAlign]
  );

 // ─── Derive export config from DeviceConfig ───────────────────────────────
  // Scale factor: export canvas is ~6× the preview frame size
  const SCALE = 4;

  const scaledWidth  = device.frame.width  * SCALE;
  const scaledHeight = device.frame.height * SCALE;
  const scaledRadius = device.frame.radius * SCALE;
  const innerRadius  = Math.max(scaledRadius - 12, 0);

  const showNotch  = device.extras === "notch";
  const showCamera = device.extras === "camera";
  const showBase   = device.extras === "stand";
  const isDesktop  = device.category === "desktop";

  // Canvas dimensions: portrait devices get portrait canvas, desktop gets landscape
  const exportCanvasSize = isDesktop
    ? { width: 2600, height: 1800 }
    : { width: Math.max(scaledWidth + 400, 1290), height: Math.max(scaledHeight + 400, 2400) };

  const TextBlock = (
    <div className="space-y-8">
      <h2
        className="text-8xl font-bold leading-tight"
        style={titleStyle}
      >
        {title}
      </h2>

      <p
        className="text-5xl leading-snug"
        style={subtitleStyle}
      >
        {subtitle}
      </p>
    </div>
  );

  const PhoneNotch = () => (
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-52 h-9 bg-black rounded-b-full z-10" />
  );

  const TabletCamera = () => (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 w-10 h-10 bg-black rounded-full z-10" />
  );

  const DesktopBase = () => (
    <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 w-[520px] h-9 bg-black rounded-b-lg z-30" />
  );

  

  return (
    <div className="invisible absolute pointer-events-none">
      <div
        ref={exportRef}
        className={`relative p-32 rounded-xl shadow-xl flex flex-col ${
          customBg ? "" : bgStyle
        }`}
        style={{...containerStyle,
          width: exportCanvasSize.width,
          height: exportCanvasSize.height
        }}
      >
        {!isInverted && TextBlock}

        <div className="flex-1 flex items-center justify-center">
          <div style={getExportDeviceStyle(positionPreset, scaledWidth, scaledHeight)}>
<div className={`bg-black p-6 border-black`} style={{
              borderRadius: scaledRadius,
              padding: device.frame.padding * SCALE * 0.8,
            }}>
            <div className={`bg-white relative flex items-center justify-center`} style={{
                width: scaledWidth,
                height: scaledHeight,
                borderRadius: innerRadius,
                paddingBottom: isDesktop ? 48 : 0,
              }}>
              {showNotch  && <PhoneNotch />}
              {showCamera && <TabletCamera />}
              {showBase   && <DesktopBase />}

              <div className="overflow-hidden" style={{
                  top:    device.screen.safeTop    * SCALE * 0.5,
                  bottom: device.screen.safeBottom * SCALE * 0.5,
                  left:   device.screen.safeLeft,
                  right:  device.screen.safeRight,
                }}>

              

              {screenshot ? (
                <img
                  src={screenshot}
                  alt={en.exportPreview.altScreenshot}
                  className={`${isDesktop ? "object-cover" : ""} w-full h-full ${
                      isInverted ? "rotate-180" : ""
                    }`}
                />
              ) : (
                <span className="text-gray-400 text-2xl text-center">
                  {en.exportPreview.noScreenshot}
                </span>
              )}
              </div>
            </div>
          </div>
          </div>
          
        </div>

        {isInverted && <div className="mt-16">{TextBlock}</div>}
      </div>
    </div>
  );
};

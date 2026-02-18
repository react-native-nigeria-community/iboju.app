import React, { useMemo } from "react";
import { ExportPreviewProps } from "../global";
import { en } from "../i18n/en";

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

  const deviceConfig = {
  mobile: {
    outer: "rounded-[110px] border-[10px]",
    inner: "w-[950px] h-[1900px] rounded-[106px]",
    showNotch: true,
    showCamera: false,
    showBase: false,
  },
  tablet: {
    outer: "rounded-[60px] border-[8px]",
    inner: "w-[1400px] h-[1900px] rounded-[48px]",
    showNotch: false,
    showCamera: true,
    showBase: false,
  },
  desktop: {
    outer: "rounded-[24px] border-[6px] ",
    inner: "w-[2000px] h-[1200px] rounded-[20px] pb-12",
    showNotch: false,
    showCamera: false,
    showBase: true,
  },
} as const;

const config = deviceConfig[device];

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
    <>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-52 h-9 bg-black rounded-b-full z-10" />
    </>
  );

  const TabletCamera = () => (
  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-10 h-10 bg-black rounded-full z-10" />
  );

const DesktopBase = () => (
  <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 w-[520px] h-9 bg-black rounded-b-lg z-30" />
  );

  const exportCanvasSize = {
  mobile: { width: 1290, height: 2796 },
  tablet: { width: 1800, height: 2796 },
  desktop: { width: 2600, height: 1800 },
}[device];

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
          <div className={`bg-black p-6 border-black ${config.outer}`}>
            <div className={`bg-white relative flex items-center justify-center ${config.inner}`}>
              {config.showNotch && <PhoneNotch />}
              {config.showCamera && <TabletCamera />}
              {config.showBase && <DesktopBase />}

              {screenshot ? (
                <img
                  src={screenshot}
                  alt={en.exportPreview.altScreenshot}
                  className={`${device === "desktop" ? "object-cover h-full" : ""} w-full ${
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

        {isInverted && <div className="mt-16">{TextBlock}</div>}
      </div>
    </div>
  );
};

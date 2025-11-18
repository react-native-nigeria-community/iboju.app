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
}) => {
  const isInverted = layout === "inverted";

  const textStyle = useMemo(
    () => ({
      unicodeBidi: "plaintext" as const,
      direction: "ltr" as const,
      textAlign,
    }),
    [textAlign]
  );

  const containerStyle = useMemo(
    () => ({
      overflow: "hidden",
      textAlign,
      background: customBg || undefined,
    }),
    [customBg, textAlign]
  );

  const TextBlock = useMemo(
    () => (
      <div className="space-y-8">
        <h2 className="text-8xl font-bold leading-tight" style={textStyle}>
          {title}
        </h2>

        <p className="text-5xl text-gray-600 leading-snug" style={textStyle}>
          {subtitle}
        </p>
      </div>
    ),
    [title, subtitle, textStyle]
  );

  const PhoneNotch = () => (
    <>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-6 bg-black rounded-b-2xl z-10" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-2.5 bg-gray-700 rounded-full mt-[10px]" />
    </>
  );

  return (
    <div className="invisible absolute pointer-events-none">
      <div
        ref={exportRef}
        className={`relative w-[1290px] h-[2796px] px-32 pt-32 pb-32 rounded-xl shadow-xl flex flex-col ${
          customBg ? "" : bgStyle
        }`}
        style={containerStyle}
      >
        {!isInverted && TextBlock}

        <div className="flex-1 flex items-center justify-center">
          <div className="bg-black rounded-[110px] p-6 border-[10px] border-black">
            <div className="w-[950px] h-[1900px] bg-white rounded-[106px] overflow-hidden relative flex items-center justify-center">
              <PhoneNotch />

              {screenshot ? (
                <img
                  src={screenshot}
                  alt={en.exportPreview.altScreenshot}
                  className={`object-cover w-full h-full ${
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

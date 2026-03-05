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
  customBgImage,
  customBgImageSize,
  presetValue,
  layout,
  titleColor,
  subtitleColor,
}) => {
  const isInverted = layout === "inverted";

  const isCustomImage = presetValue === "customImage";
  const isCustomColor = presetValue === "customColor";

  const backgroundSource = customBgImage || "placeholder.jpg";

  const titleStyle = useMemo(
    () => ({
      unicodeBidi: "plaintext" as const,
      direction: "ltr" as const,
      textAlign,
      color: titleColor,
    }),
    [textAlign, titleColor],
  );

  const subtitleStyle = useMemo(
    () => ({
      unicodeBidi: "plaintext" as const,
      direction: "ltr" as const,
      textAlign,
      color: subtitleColor,
    }),
    [textAlign, subtitleColor],
  );

  const containerStyle = useMemo(
    () => ({
      textAlign,
      backgroundImage: isCustomImage ? `url(${backgroundSource})` : undefined,
      backgroundColor: isCustomColor ? customBg || undefined : undefined,
      backgroundSize: customBgImageSize,
    }),
    [customBg, textAlign, customBgImage, customBgImageSize],
  );

  const TextBlock = (
    <div className="flex flex-col gap-2">
      <h2 className="text-xl font-bold outline-none" style={titleStyle}>
        {title}
      </h2>

      <p className="outline-none" style={subtitleStyle}>
        {subtitle}
      </p>
    </div>
  );

  return (
    <div className="invisible pointer-events-none">
      <div
        ref={exportRef}
        className={`relative w-full max-w-md mx-auto p-6 rounded-xl shadow-xl flex flex-col opacity-0 ${!isCustomImage && !isCustomColor ? bgStyle : ""} h-[700px] overflow-hidden`}
        style={containerStyle}
      >
        {/* TITLE + SUBTITLE (default layout) */}
        {!isInverted && TextBlock}

        {/* PHONE MOCKUP */}
        <div className="flex justify-center items-center flex-1">
          <div className="bg-black rounded-[32px] p-2 border-4 border-black shadow-md">
            <div className="w-[220px] h-[440px] bg-white rounded-[24px] overflow-hidden relative flex items-center justify-center">
              {/* notch */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-3 bg-black rounded-b-xl z-10" />

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
          <div className="flex flex-col gap-2 mt-4">{TextBlock} </div>
        )}
      </div>
    </div>
  );
};

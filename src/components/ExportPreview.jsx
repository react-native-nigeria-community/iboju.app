import React from 'react';

export const ExportPreview = ({
  exportRef,
  title,
  subtitle,
  screenshot,
  textAlign,
  bgStyle,
  customBg,
  layout
}) => {
  const isInverted = layout === 'inverted';

  const TextBlock = () => (
    <div className="space-y-8">
      <h2
        className="text-8xl font-bold leading-tight"
        style={{ unicodeBidi: 'plaintext', direction: 'ltr', textAlign }}
      >
        {title}
      </h2>
      <p
        className="text-5xl text-gray-600 leading-snug"
        style={{ unicodeBidi: 'plaintext', direction: 'ltr', textAlign }}
      >
        {subtitle}
      </p>
    </div>
  );

  return (
    <div style={{ visibility: 'hidden', position: 'absolute', pointerEvents: 'none' }}>
      <div
        ref={exportRef}
        className={`relative w-[1290px] h-[2796px] px-32 pt-32 pb-32 rounded-xl shadow-xl flex flex-col ${
          customBg ? '' : bgStyle
        }`}
        style={{
          overflow: 'hidden',
          textAlign,
          background: customBg || undefined
        }}
      >
        {/* Default layout: text at top, phone centered below */}
        {!isInverted && <TextBlock />}

        {/* Phone mockup centered vertically */}
        <div className="flex-1 flex items-center justify-center">
          <div className="bg-black rounded-[110px] p-6 border-[10px] border-black">
            <div className="w-[950px] h-[1900px] bg-white rounded-[106px] overflow-hidden relative flex items-center justify-center">
              {/* Outer notch area */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-48 h-6 bg-black rounded-b-2xl z-10"></div>
              {/* Inner small notch */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-2.5 bg-gray-700 rounded-full mt-[10px]"></div>

              {screenshot ? (
                <img
                  src={screenshot}
                  alt="App Screenshot"
                  className={`object-cover w-full h-full ${isInverted ? 'rotate-180' : ''}`}
                />
              ) : (
                <span className="text-gray-400 text-2xl text-center">
                  No screenshot
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Inverted layout: phone first, text at bottom */}
        {isInverted && (
          <div className="mt-16">
            <TextBlock />
          </div>
        )}
      </div>
    </div>
  );
};

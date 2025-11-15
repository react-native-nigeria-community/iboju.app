import React, { useRef, useEffect } from 'react';

export const Preview = ({
  title,
  setTitle,
  subtitle,
  setSubtitle,
  screenshot,
  textAlign,
  bgStyle,
  customBg,
  layout
}) => {
  const isInverted = layout === 'inverted';

  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  // Sync title when switching screens OR switching layout
  useEffect(() => {
    if (titleRef.current && titleRef.current.textContent !== title) {
      titleRef.current.textContent = title || '';
    }
  }, [title, layout]); // 👈 layout added

  // Sync subtitle when switching screens OR switching layout
  useEffect(() => {
    if (subtitleRef.current && subtitleRef.current.textContent !== subtitle) {
      subtitleRef.current.textContent = subtitle || '';
    }
  }, [subtitle, layout]); // 👈 layout added

  return (
    <div className="flex-1">
      <div
        className={`relative w-full max-w-md mx-auto p-6 rounded-xl shadow-xl flex flex-col ${
          customBg ? '' : bgStyle
        } h-[700px] overflow-hidden`}
        style={{
          textAlign,
          background: customBg || undefined
        }}
      >
        {/* TITLE + SUBTITLE (Default Layout) */}
        {!isInverted && (
          <div className="flex flex-col gap-2">
            <h2
              ref={titleRef}
              contentEditable
              suppressContentEditableWarning
              dir="ltr"
              onInput={(e) => setTitle(e.currentTarget.textContent)}
              className="text-xl font-bold outline-none text-black"
              style={{ textAlign }}
            />

            <p
              ref={subtitleRef}
              contentEditable
              suppressContentEditableWarning
              dir="ltr"
              onInput={(e) => setSubtitle(e.currentTarget.textContent)}
              className="text-gray-700 outline-none"
              style={{ textAlign }}
            />
          </div>
        )}

        {/* PHONE MOCKUP */}
        <div className="flex justify-center items-center flex-1">
          <div className="bg-black rounded-[32px] p-2 border-4 border-black shadow-md">
            <div className="w-[220px] h-[440px] bg-white rounded-[24px] overflow-hidden relative flex items-center justify-center">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-3 bg-black rounded-b-xl z-10"></div>

              {screenshot ? (
                <img
                  src={screenshot}
                  alt="Phone Screenshot"
                  className={`w-full ${isInverted ? 'rotate-180' : ''}`}
                />
              ) : (
                <span className="text-gray-400 text-sm text-center">
                  No screenshot
                </span>
              )}
            </div>
          </div>
        </div>

        {/* TITLE + SUBTITLE (Inverted Layout) */}
        {isInverted && (
          <div className="flex flex-col gap-2 mt-4">
            <h2
              ref={titleRef}
              contentEditable
              suppressContentEditableWarning
              dir="ltr"
              onInput={(e) => setTitle(e.currentTarget.textContent)}
              className="text-xl font-bold outline-none text-black"
              style={{ textAlign }}
            />

            <p
              ref={subtitleRef}
              contentEditable
              suppressContentEditableWarning
              dir="ltr"
              onInput={(e) => setSubtitle(e.currentTarget.textContent)}
              className="text-gray-700 outline-none"
              style={{ textAlign }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

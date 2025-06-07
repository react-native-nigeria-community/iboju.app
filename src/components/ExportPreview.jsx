import React from 'react';
export const ExportPreview = ({ exportRef, title, subtitle, screenshot, textAlign, bgStyle }) => {
  return (
    <div style={{ visibility: 'hidden', position: 'absolute', pointerEvents: 'none' }}>
      <div
        ref={exportRef}
        className={`relative w-[1290px] h-[2796px] px-32 pt-32 pb-0 rounded-xl shadow-xl ${bgStyle}`}
        style={{ overflow: 'hidden', textAlign }}
      >
        <div className="space-y-16">
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
        <div className="absolute left-1/2 bottom-[-100px] transform -translate-x-1/2 bg-black rounded-[110px] p-6 border-[10px] border-black">
          <div className="w-[950px] h-[1900px] bg-white rounded-[106px] overflow-hidden relative flex items-center justify-center">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-48 h-6 bg-black rounded-b-2xl z-10"></div>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-2.5 bg-gray-700 rounded-full mt-[10px]"></div>
            {screenshot ? (
              <img
                src={screenshot}
                alt="App Screenshot"
                className="object-cover w-full h-full"
              />
            ) : (
              <span className="text-gray-400 text-2xl text-center">No screenshot</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

 
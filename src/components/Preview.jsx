import React from 'react';
export const Preview = ({ title, setTitle, subtitle, setSubtitle, screenshot, textAlign, bgStyle }) => {
  return (
    <div className="flex-1">
      <div
        className={`relative w-full max-w-md mx-auto p-6 rounded-xl shadow-xl space-y-4 ${bgStyle}`}
        style={{ height: '700px', overflow: 'hidden', textAlign }}
      >
        <h2
          contentEditable
          suppressContentEditableWarning
          onInput={(e) => setTitle(e.currentTarget.textContent)}
          className="text-xl font-bold outline-none"
          style={{ unicodeBidi: 'isolate', direction: 'ltr', textAlign }}
        >
          {title}
        </h2>
        <p
          contentEditable
          suppressContentEditableWarning
          onInput={(e) => setSubtitle(e.currentTarget.textContent)}
          className="text-gray-600 outline-none"
          style={{ unicodeBidi: 'isolate', direction: 'ltr', textAlign }}
        >
          {subtitle}
        </p>
        <div className="absolute left-1/2 bottom-[-60px] transform -translate-x-1/2 bg-black rounded-[32px] p-2 border-4 border-black shadow-md">
          <div className="w-[220px] h-[440px] bg-white rounded-[24px] overflow-hidden relative flex items-center justify-center">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-3 bg-black rounded-b-xl z-10"></div>
            {screenshot ? (
              <img
                src={screenshot}
                alt="App Screenshot"
                className="object-cover w-full h-full"
              />
            ) : (
              <span className="text-gray-400 text-sm text-center">No screenshot</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export function isAllowedDevice(): boolean {
  const ua = navigator.userAgent.toLowerCase();
  const isTouch = navigator.maxTouchPoints > 1;

  const isMobile =
    /iphone|android|ipod|opera mini|blackberry|windows phone/i.test(ua);

  const isiPad =
    /ipad/.test(ua) || (isTouch && /macintosh/.test(ua));

  if (isiPad) return true;
  if (isMobile) return false;
  if (isTouch && !isiPad) return false;

  return true;
}
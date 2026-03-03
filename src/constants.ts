import { DeviceConfig, GradientOption, ScreenItem } from "./global";
import { en } from "./i18n/en";

export const PRESET_GRADIENTS: GradientOption[] = [
  { name: "Purple → Pink", value: "bg-gradient-to-r from-purple-400 to-pink-500" },
  { name: "Blue → Green", value: "bg-gradient-to-r from-blue-400 to-green-400" },
  { name: "Dark", value: "bg-gray-800 text-white" },
];

// ─── Phone Devices ────────────────────────────────────────────────────────────

export const IPHONE_15_PRO: DeviceConfig = {
  id: "iphone-15-pro",
  name: "iPhone 15 Pro",
  category: "phone",
  frame: { width: 220, height: 440, radius: 36, padding: 8 },
  screen: { safeTop: 20, safeBottom: 8, safeLeft: 0, safeRight: 0 },
  extras: "notch",
};

export const IPHONE_15: DeviceConfig = {
  id: "iphone-15",
  name: "iPhone 15",
  category: "phone",
  frame: { width: 220, height: 440, radius: 32, padding: 8 },
  screen: { safeTop: 16, safeBottom: 6, safeLeft: 0, safeRight: 0 },
  extras: "notch",
};

export const IPHONE_SE: DeviceConfig = {
  id: "iphone-se",
  name: "iPhone SE (3rd Gen)",
  category: "phone",
  frame: { width: 200, height: 380, radius: 18, padding: 8 },
  screen: { safeTop: 8, safeBottom: 0, safeLeft: 0, safeRight: 0 },
  extras: undefined,
};

export const SAMSUNG_S24: DeviceConfig = {
  id: "samsung-s24",
  name: "Samsung Galaxy S24",
  category: "phone",
  frame: { width: 215, height: 445, radius: 30, padding: 8 },
  screen: { safeTop: 14, safeBottom: 8, safeLeft: 0, safeRight: 0 },
  extras: "camera",
};

export const SAMSUNG_S24_ULTRA: DeviceConfig = {
  id: "samsung-s24-ultra",
  name: "Galaxy S24 Ultra",
  category: "phone",
  frame: { width: 220, height: 460, radius: 22, padding: 8 },
  screen: { safeTop: 16, safeBottom: 8, safeLeft: 0, safeRight: 0 },
  extras: "camera",
};

export const PIXEL_8: DeviceConfig = {
  id: "pixel-8",
  name: "Google Pixel 8",
  category: "phone",
  frame: { width: 215, height: 440, radius: 26, padding: 8 },
  screen: { safeTop: 16, safeBottom: 8, safeLeft: 0, safeRight: 0 },
  extras: "camera",
};

// ─── Tablet Devices ───────────────────────────────────────────────────────────

export const IPAD_PRO_13: DeviceConfig = {
  id: "ipad-pro-13",
  name: 'iPad Pro 13"',
  category: "tablet",
  frame: { width: 320, height: 420, radius: 16, padding: 10 },
  screen: { safeTop: 12, safeBottom: 8, safeLeft: 0, safeRight: 0 },
  extras: "camera",
};

export const IPAD_MINI: DeviceConfig = {
  id: "ipad-mini",
  name: "iPad mini (6th Gen)",
  category: "tablet",
  frame: { width: 280, height: 370, radius: 14, padding: 10 },
  screen: { safeTop: 10, safeBottom: 8, safeLeft: 0, safeRight: 0 },
  extras: "camera",
};

export const SAMSUNG_TAB_S9: DeviceConfig = {
  id: "samsung-tab-s9",
  name: "Samsung Galaxy Tab S9",
  category: "tablet",
  frame: { width: 300, height: 400, radius: 18, padding: 10 },
  screen: { safeTop: 12, safeBottom: 8, safeLeft: 0, safeRight: 0 },
  extras: "camera",
};

export const SAMSUNG_TAB_S9_ULTRA: DeviceConfig = {
  id: "samsung-tab-s9-ultra",
  name: "Galaxy Tab S9 Ultra",
  category: "tablet",
  frame: { width: 340, height: 440, radius: 12, padding: 10 },
  screen: { safeTop: 14, safeBottom: 8, safeLeft: 0, safeRight: 0 },
  extras: "camera",
};

// ─── Desktop Devices ───────────────────────────────────────────────────────────
export const MACBOOK_PRO_16: DeviceConfig = {
  id: "macbook-pro-16",
  name: 'MacBook Pro 16"',
  category: "desktop",
  frame: { width: 480, height: 300, radius: 8, padding: 10 },
  screen: { safeTop: 8, safeBottom: 28, safeLeft: 0, safeRight: 0 },
  extras: "stand",
};

export const MACBOOK_AIR: DeviceConfig = {
  id: "macbook-air",
  name: "MacBook Air",
  category: "desktop",
  frame: { width: 460, height: 290, radius: 8, padding: 10 },
  screen: { safeTop: 8, safeBottom: 24, safeLeft: 0, safeRight: 0 },
  extras: "stand",
};

export const DESKTOP_MONITOR: DeviceConfig = {
  id: "desktop-monitor",
  name: "Desktop Monitor",
  category: "desktop",
  frame: { width: 500, height: 320, radius: 6, padding: 10 },
  screen: { safeTop: 6, safeBottom: 40, safeLeft: 0, safeRight: 0 },
  extras: "stand",
};

// ─── All Devices grouped ──────────────────────────────────────────────────────

export const DEVICES_BY_CATEGORY: Record<string, DeviceConfig[]> = {
  Phone: [IPHONE_15_PRO, IPHONE_15, IPHONE_SE, SAMSUNG_S24, SAMSUNG_S24_ULTRA, PIXEL_8],
  Tablet: [IPAD_PRO_13, IPAD_MINI, SAMSUNG_TAB_S9, SAMSUNG_TAB_S9_ULTRA],
  Desktop: [MACBOOK_PRO_16, MACBOOK_AIR, DESKTOP_MONITOR],
};

export const NEW_SCREEN_TEMPLATE: ScreenItem = {
  id: 0, 
  screenshot: null,
  title: en.app.newScreenTitle,
  subtitle: en.app.newScreenSubtitle,
  textAlign: "center",
  bgStyle: "bg-white",
  customBg: null,
  layout: "default",
  titleColor: "#111827",     
  subtitleColor: "#4B5563",   
  isTextColorCustom: false,
  device: IPHONE_15,
  positionPreset: "centered",
};
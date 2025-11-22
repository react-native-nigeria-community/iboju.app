import { GradientOption, ScreenItem } from "./global";
import { en } from "./i18n/en";

export const PRESET_GRADIENTS: GradientOption[] = [
  { name: "Purple → Pink", value: "bg-gradient-to-r from-purple-400 to-pink-500" },
  { name: "Blue → Green", value: "bg-gradient-to-r from-blue-400 to-green-400" },
  { name: "Dark", value: "bg-gray-800 text-white" },
];

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
};
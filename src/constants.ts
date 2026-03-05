import { GradientOption, ScreenItem } from "./global";
import { en } from "./i18n/en";

export const PRESET_GRADIENTS: GradientOption[] = [
  { name: "White", value: "bg-white" },
  { name: "Purple → Pink", value: "bg-gradient-to-r from-purple-400 to-pink-500" },
  { name: "Blue → Green", value: "bg-gradient-to-r from-blue-400 to-green-400" },
  { name: "Sunset", value: "bg-gradient-to-r from-orange-400 via-red-500 to-pink-500" },
  { name: "Ocean", value: "bg-gradient-to-r from-cyan-400 to-blue-500" },
  { name: "Lush", value: "bg-gradient-to-r from-green-300 via-yellow-200 to-green-500" },
  { name: "Berry", value: "bg-gradient-to-r from-purple-500 to-indigo-600" },
  { name: "Golden", value: "bg-gradient-to-r from-yellow-300 via-orange-400 to-red-400" },
  { name: "Midnight", value: "bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900" },
  { name: "Fire", value: "bg-gradient-to-r from-orange-600 to-red-600" },
  { name: "Sky", value: "bg-gradient-to-r from-sky-400 to-blue-600" },
  { name: "Forest", value: "bg-gradient-to-r from-emerald-500 to-lime-600" },
  { name: "Lavender", value: "bg-gradient-to-r from-indigo-300 to-purple-400" },
  { name: "Neon", value: "bg-gradient-to-r from-lime-300 to-cyan-400" },
  { name: "Rose", value: "bg-gradient-to-r from-rose-400 to-pink-600" },
  { name: "Nordic", value: "bg-gradient-to-r from-slate-400 to-slate-600" },
  { name: "Abyss", value: "bg-gradient-to-r from-blue-900 to-black" },
  { name: "Aurora", value: "bg-gradient-to-r from-green-400 via-teal-500 to-purple-500" },
  { name: "Candy", value: "bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400" },
  { name: "Desert", value: "bg-gradient-to-r from-amber-200 to-yellow-500" },
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
  customBgImage: null,
  customBgImageSize: "cover",
  customBgImageName: "",
  presetValue: "bg-white",
  layout: "default",
  titleColor: "#111827",     
  subtitleColor: "#4B5563",   
  isTextColorCustom: false,
};
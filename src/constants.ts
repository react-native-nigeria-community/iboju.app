import { GradientOption, ScreenItem } from "./global";
import { en } from "./i18n/en";

export const PRESET_GRADIENTS: GradientOption[] = [
  { name: "Purple → Pink", value: "bg-gradient-to-r from-purple-400 to-pink-500" },
  { name: "Blue → Green", value: "bg-gradient-to-r from-blue-400 to-green-400" },
  { name: "Dark", value: "bg-gray-800 text-white" },
];

export const AVAILABLE_FONTS = [
  { name: "Poppins", value: "Poppins" },
  { name: "Roboto", value: "Roboto" },
  { name: "Inter", value: "Inter" },
  { name: "Playfair Display", value: "Playfair Display" },
  { name: "Lato", value: "Lato" },
  { name: "Open Sans", value: "Open Sans" },
  { name: "Montserrat", value: "Montserrat" },
  { name: "Raleway", value: "Raleway" },
  { name: "Ubuntu", value: "Ubuntu" },
  { name: "Merriweather", value: "Merriweather" },
  { name: "Oswald", value: "Oswald" },
  { name: "Source Sans Pro", value: "Source Sans Pro" },
  { name: "Crimson Text", value: "Crimson Text" },
  { name: "Dancer Italic", value: "Dancer Italic" },
  { name: "Jetbrains Mono", value: "JetBrains Mono" },
  { name: "Pacifico", value: "Pacifico" },
  { name: "Great Vibes", value: "Great Vibes" },
  { name: "Do Hyeon", value: "Do Hyeon" },
  { name: "Bebas Neue", value: "Bebas Neue" },
  { name: "Caveat", value: "Caveat" },
  { name: "Righteous", value: "Righteous" },
  { name: "Comfortaa", value: "Comfortaa" },
  { name: "Nunito", value: "Nunito" },
  { name: "Quicksand", value: "Quicksand" },
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
  titleFont: "Poppins",
  subtitleFont: "Poppins",
};
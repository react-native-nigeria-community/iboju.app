import { ChangeEvent, ReactNode, RefObject } from "react";

interface GradientOption {
  name: string;
  value: string;
}

interface ColorPickerProps {
  bgStyle: string;
  setBgStyle: (style: string) => void;
}

export type PositionPreset =
  | "centered"
  | "bleed-bottom"
  | "bleed-top"
  | "float-center"
  | "float-bottom"
  | "tilt-left"
  | "tilt-right"
  | "perspective";

export interface ControlsProps {
  bgStyle: string;
  customBg: string | null;
  textAlign: "left" | "center" | "right";
  layout: "default" | "inverted";

  titleColor: string;
  subtitleColor: string;
  isTextColorCustom: boolean;

  setBgStyle: (value: string) => void;
  setCustomBg: (value: string | null) => void;
  setTextAlign: (value: "left" | "center" | "right") => void;
  setLayout: (value: "default" | "inverted") => void;

  setTitleColor: (value: string) => void;
  setSubtitleColor: (value: string) => void;
  setIsTextColorCustom: (value: boolean) => void;

  handleImageUpload: (e: ChangeEvent<HTMLInputElement>) => void;

  // NEW: notify parent when a preset is chosen so it can auto-adjust colors
  onPresetChange?: (preset: string) => void;

  device: DeviceConfig;
  setDevice: (device: DeviceConfig) => void;

  positionPreset: PositionPreset;
  setPositionPreset: (preset: PositionPreset) => void;
}

export interface ScreenItem {
  id: number;
  screenshot: string | null;
  title: string;
  subtitle: string;
  textAlign: "left" | "center" | "right";
  bgStyle: string;
  customBg: string | null;
  layout: "default" | "inverted"; 
  titleColor: string;
  subtitleColor: string;
  isTextColorCustom: boolean;
  device: DeviceConfig;
  positionPreset: PositionPreset;
}

export interface ExportPreviewProps {
  exportRef: RefObject<HTMLDivElement | null>;
  title: string;
  subtitle: string;
  screenshot: string | null;
  textAlign: "left" | "center" | "right";
  bgStyle: string;
  customBg: string | null;
  layout: "default" | "inverted";
  titleColor: string;
 subtitleColor: string;
 device: DeviceConfig;
 positionPreset: PositionPreset;
}

export interface ScreenItemLeftBar {
  id: number;
  title?: string;
}

type DeviceType = "mobile" | "tablet" | "desktop";

export interface LeftSidebarProps {
  screens: ScreenItemLeftBar[];
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  addNewScreen: (device: DeviceType) => void;
  deleteScreen: (id: number) => void;
  sidebarsCollapsed: boolean;
  setSidebarsCollapsed: (collapsed: boolean) => void;
}

export interface LeftSidebarPillProps {
  addNewScreen: (device: DeviceType) => void;
  setSidebarsCollapsed: (value: boolean) => void;
}

export interface LeftSidebarExpandedProps extends Omit<LeftSidebarProps, "screens"> {
  screens: ScreenItemLeftBar[];
  filteredScreens: ScreenItemLeftBar[];
  search: string;
  setSearch: (value: string) => void;
}

export interface RightSidebarProps {
  children: ReactNode;
  sidebarsCollapsed: boolean;
  setSidebarsCollapsed: (value: boolean) => void;
  onExportCurrent: () => void;
  onExportAll: () => void;
}

export interface ScreenItem {
  id: number;
  screenshot: string | null;
  title: string;
  subtitle: string;
  textAlign: "left" | "center" | "right";
  bgStyle: string;
  customBg: string | null;
  layout: "default" | "inverted";
}

export interface DeviceConfig {
  id: string;
  name: string;
  category: "phone" | "tablet" | "desktop";
  frame: {
    width: number;
    height: number;
    radius: number;
    padding: number;
  };
  screen: {
    safeTop: number;
    safeBottom: number;
    safeLeft: number;
    safeRight: number;
  };
  extras?: "notch" | "camera" | "stand";
}
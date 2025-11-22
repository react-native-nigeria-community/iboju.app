import { ChangeEvent, ReactNode, RefObject } from "react";

interface GradientOption {
  name: string;
  value: string;
}

interface ColorPickerProps {
  bgStyle: string;
  setBgStyle: (style: string) => void;
}

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
}

export interface ScreenItemLeftBar {
  id: number;
  title?: string;
}

export interface LeftSidebarProps {
  screens: ScreenItemLeftBar[];
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  addNewScreen: () => void;
  deleteScreen: (id: number) => void;
  sidebarsCollapsed: boolean;
  setSidebarsCollapsed: (collapsed: boolean) => void;
}

export interface LeftSidebarPillProps {
  addNewScreen: () => void;
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
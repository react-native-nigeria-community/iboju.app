import { ChangeEvent, ReactNode, RefObject } from "react";

interface GradientOption {
  name: string;
  value: string;
}

interface ColorPickerProps {
  bgStyle: string;
  setBgStyle: (style: string) => void;
}

interface ControlsProps {
  bgStyle: string;
  customBg: string | null;
  textAlign: "left" | "center" | "right";
  layout: "default" | "inverted";

  setBgStyle: (style: string) => void;
 setCustomBg: (color: string | null) => void;
  setTextAlign: (align: "left" | "center" | "right") => void;
  setLayout: (layout: "default" | "inverted") => void;

  handleImageUpload: (e: ChangeEvent<HTMLInputElement>) => void;
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

export interface ExportPreviewProps {
  exportRef: RefObject<HTMLDivElement | null>;
  title: string;
  subtitle: string;
  screenshot: string | null;
  textAlign: "left" | "center" | "right";
  bgStyle: string;
  customBg: string | null;
  layout: "default" | "inverted";
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
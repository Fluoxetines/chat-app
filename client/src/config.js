import { enUS, viVN } from "@mui/material/locale";

import { PATH_DASHBOARD } from "./routes/paths";

export const BASE_URL = "htpp://localhost:5000";

export const defaultSettings = {
  themeMode: "light",
  themeDirection: "ltr",
  themeContrast: "default",
  themeLayout: "horizontal",
  themeColorPresets: "default",
  themeStretch: false,
};

export const NAVBAR = {
  BASE_WIDTH: 360,
  DASHBOARD_WIDTH: 280,
  DASHBOARD_COLLAPSE_WIDTH: 88,
  DASHBOARD_ITEM_ROOT_HEIGHT: 48,
  DASHBOARD_ITEM_SUB_HEIGHT: 40,
  DASHBOARD_ITEM_HORIZATION_HEGIHT: 32,
};

export const allLangs = [
  {
    label: "English",
    value: "en",
    systemValue: enUS,
  },
  {
    label: "Vietnamese",
    value: "vn",
    systemValue: viVN,
  },
];

export const defaultLang = allLangs[0]; // 0 : English, 1 : Vietnamese

export const DEFAULT_PATH = PATH_DASHBOARD.general.app;

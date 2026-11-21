export const ICON_PATHS = {
  arrowRight: "M5 12h14m-6-6 6 6-6 6",
  check: "m5 12 5 5 9-10",
  chevronLeft: "m15 18-6-6 6-6",
  download: "M12 4v12m-5-5 5 5 5-5M5 20h14",
  listCheck: "m4 6 1.5 1.5L8 5M4 12l1.5 1.5L8 11M4 18l1.5 1.5L8 17M12 6h8M12 12h8M12 18h8",
  minus: "M5 12h14",
  plus: "M12 5v14M5 12h14",
  search: "M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14Zm9 2-3.5-3.5",
  trash: "M4 7h16M10 11v6M14 11v6M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12M9 7V4h6v3",
  upload: "M12 20V8m-5 5 5-5 5 5M5 4h14",
} as const;

export type IconName = keyof typeof ICON_PATHS;

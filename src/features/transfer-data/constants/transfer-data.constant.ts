export const EXPORT_FILE_PREFIX = "checklist";
export const IMPORT_ACCEPT = "application/json,.json";

export const TRANSFER_DATA_TEXT = {
  note: "Данные хранятся только в этом браузере.",
  export: "Экспорт",
  import: "Импорт",
  importTitle: "Импортировать файл",
  importDescription: "Перенести баллы и отметки из .json",
  confirmImport: "Заменить все предметы и отметки данными из файла?",
  invalidFile: "Не получилось прочитать файл. Нужен .json, выгруженный кнопкой «Экспорт».",
} as const;

export const STATUSES = ["todo", "submitted", "done"] as const;
export const MARKS = ["present", "absent", "excused"] as const;
export const SUBJECT_KINDS = ["Зачет", "Экзамен"] as const;
export const EXAM_KIND = "Экзамен";
export const UNTITLED = "Без названия";
export const SUBJECT_FORMS = { one: "предмет", few: "предмета", many: "предметов" } as const;

export const DEFAULT_ATTENDANCE = { lectures: 8, maxPoints: 20 } as const;
export const MAX_LECTURES = 60;

export const STATUS_LABELS = {
  todo: "Не сделано",
  submitted: "Не защищено",
  done: "Сделано",
} as const;

export const STATUS_STYLES = {
  todo: { active: "bg-white text-zinc-900 shadow-sm", dot: "bg-zinc-300", mark: "border-zinc-300" },
  submitted: { active: "bg-amber-400 text-amber-950 shadow-sm", dot: "bg-amber-400", mark: "border-amber-400 bg-amber-400" },
  done: { active: "bg-emerald-500 text-white shadow-sm", dot: "bg-emerald-500", mark: "border-emerald-500 bg-emerald-500 text-white" },
} as const;

export const MARK_LABELS = {
  present: { label: "+", title: "Был", active: "bg-emerald-500 text-white shadow-sm" },
  absent: { label: "−", title: "Не был", active: "bg-rose-500 text-white shadow-sm" },
  excused: { label: "У", title: "Уважительная причина", active: "bg-amber-400 text-amber-950 shadow-sm" },
} as const;

export const SUBJECT_TEXT = {
  noKind: "Не указана",
  noDue: "Без срока",
  due: "Срок:",
  duePassed: "Срок прошел,",
  of: "из",
  points: "баллов",
  noBlocks: "Контрольных пока нет",
  allClosed: "Все закрыто",
  overdue: "Просрочено:",
} as const;

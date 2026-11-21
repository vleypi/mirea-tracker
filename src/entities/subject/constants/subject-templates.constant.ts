import type { IItem, ISubject } from "@/entities/subject/interfaces/subject.interface";
import { createAttendance, createBlock, createItem } from "@/entities/subject/utils/subject-factory.util";

const PRACTICE = "Практика";
const LAB = "Лаба";

const range = (from: number, to: number): number[] => Array.from({ length: to - from + 1 }, (_, index) => from + index);

const series = (label: string, numbers: (number | string)[]): IItem[] =>
  numbers.map((number) => createItem({ id: String(number), title: `${label} ${number}` }));

const STANDARD_BLOCKS = [
  { id: "kr1", title: "КР1", due: "2026-09" },
  { id: "kr2", title: "КР2", due: "2026-10" },
  { id: "kr3", title: "КР3", due: "2026-11" },
  { id: "kr4", title: "КР4", due: "2026-12" },
  { id: "test", title: "Тест", due: "2026-12" },
] as const;

const standardBlocks = (required: number[]) => STANDARD_BLOCKS.map((block, index) => createBlock({ ...block, required: required[index] }));

export const SUBJECT_TEMPLATES: ISubject[] = [
  {
    id: "ml",
    title: "Алгоритмы машинного обучения",
    kind: "Зачет",
    attendance: createAttendance(),
    blocks: [
      createBlock({ id: "kr1", title: "КР1", required: 6, due: "2026-09-30", items: series(PRACTICE, ["1-2", "3-4"]) }),
      createBlock({ id: "kr2", title: "КР2", required: 7, due: "2026-10-31", items: series(PRACTICE, ["5-6", "7-8", "9"]) }),
      createBlock({ id: "kr3", title: "КР3", required: 8, due: "2026-11-30", items: series(PRACTICE, ["10", "11-12", "13-14"]) }),
      createBlock({ id: "kr4", title: "КР4", required: 14, due: "2026-12-28", items: series(PRACTICE, [15, 16]) }),
      createBlock({ id: "test", title: "Тест", required: 10, due: "2026-12-23" }),
    ],
  },
  {
    id: "devops",
    title: "Инструменты девопс",
    kind: "Зачет",
    attendance: createAttendance(),
    blocks: [
      createBlock({ id: "kr1", title: "КР1", required: 7, due: "2026-09-30", items: series(PRACTICE, range(1, 4)) }),
      createBlock({ id: "kr2", title: "КР2", required: 8, due: "2026-10-31", items: series(PRACTICE, range(5, 8)) }),
      createBlock({ id: "kr3", title: "КР3", required: 9, due: "2026-11-30", items: series(PRACTICE, range(9, 12)) }),
      createBlock({ id: "kr4", title: "КР4", required: 15, due: "2026-12-21", items: series(PRACTICE, range(13, 16)) }),
      createBlock({ id: "test", title: "Тест", required: 6, due: "2026-12-14" }),
    ],
  },
  {
    id: "design",
    title: "Компьютерный дизайн",
    kind: "Экзамен",
    attendance: createAttendance(),
    blocks: [
      createBlock({ id: "kr1", title: "КР1", required: 5, due: "2026-09" }),
      createBlock({ id: "kr2", title: "КР2", required: 5, due: "2026-10" }),
      createBlock({ id: "kr3", title: "КР3", required: 5, due: "2026-11" }),
      createBlock({ id: "kr4", title: "КР4", required: 10, due: "2026-11" }),
      createBlock({ id: "kr5", title: "КР5", required: 10, due: "2026-12" }),
      createBlock({ id: "presentation", title: "Презентация", required: 10, due: "2026-12" }),
    ],
  },
  { id: "math", title: "Математика для программирования", kind: "Зачет", attendance: createAttendance(), blocks: standardBlocks([7, 8, 9, 15, 6]) },
  {
    id: "corporate",
    title: "Программирование корпоративных систем",
    kind: "Зачет",
    attendance: createAttendance(),
    blocks: standardBlocks([7, 8, 9, 15, 6]),
  },
  { id: "devices", title: "Программирование электронных приборов и систем", kind: null, attendance: createAttendance(), blocks: [] },
  { id: "software", title: "Создание программного обеспечения", kind: null, attendance: createAttendance(), blocks: standardBlocks([7, 6, 5, 17, 10]) },
  {
    id: "frameworks",
    title: "Технологии разработки приложений на базе фреймворков",
    kind: null,
    attendance: createAttendance(),
    blocks: standardBlocks([7, 8, 9, 15, 6]),
  },
  {
    id: "modeling",
    title: "Трехмерное моделирование индустриальных объектов",
    kind: null,
    attendance: createAttendance(),
    blocks: [
      createBlock({ id: "practice", title: "Практики", required: 16, items: series(PRACTICE, range(1, 8)) }),
      createBlock({ id: "labs", title: "Лабы", required: 20, items: series(LAB, range(1, 4)) }),
      createBlock({ id: "test", title: "Тест", required: 9 }),
    ],
  },
];

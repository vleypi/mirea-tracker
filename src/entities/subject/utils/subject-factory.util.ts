import { DEFAULT_ATTENDANCE } from "@/entities/subject/constants/subject.constant";
import type { IAttendance, IBlock, IItem, ISubject } from "@/entities/subject/interfaces/subject.interface";

const ID_RADIX = 36;
const RANDOM_ID_LENGTH = 4;

export const createId = (): string =>
  `${Date.now().toString(ID_RADIX)}${Math.random()
    .toString(ID_RADIX)
    .slice(2, 2 + RANDOM_ID_LENGTH)}`;

export const createItem = ({ id = createId(), title, status = "todo" }: Pick<IItem, "title"> & Partial<IItem>): IItem => ({ id, title, status });

export const createBlock = ({
  id = createId(),
  title,
  required = 0,
  points = 0,
  status = "todo",
  due = null,
  items = [],
}: Pick<IBlock, "title"> & Partial<IBlock>): IBlock => ({ id, title, required, points, status, due, items });

export const createAttendance = (lectures: number = DEFAULT_ATTENDANCE.lectures, max: number = DEFAULT_ATTENDANCE.maxPoints): IAttendance => ({
  max,
  marks: Array.from({ length: lectures }, () => null),
});

export const createSubject = ({ title, kind }: Pick<ISubject, "title" | "kind">): ISubject => ({ id: createId(), title, kind, attendance: null, blocks: [] });

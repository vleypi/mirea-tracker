import type { IAttendance, IAttendanceStats } from "@/entities/subject/interfaces/subject.interface";

export const getAttendanceStats = ({ max, marks }: IAttendance): IAttendanceStats => {
  const count = (mark: IAttendance["marks"][number]) => marks.filter((value) => value === mark).length;
  const excused = count("excused");
  const counted = marks.length - excused;
  const perLecture = counted ? max / counted : 0;
  return { max, total: marks.length, excused, counted, perLecture, points: count("present") * perLecture, left: count(null) };
};

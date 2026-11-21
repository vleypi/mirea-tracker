import { joinClassNames } from "@/shared/lib";
import { STATUS_STYLES } from "@/entities/subject/constants/subject.constant";
import type { Status } from "@/entities/subject/interfaces/subject.interface";

interface IStatusDotProps {
  status: Status;
}

export const StatusDot = ({ status }: IStatusDotProps) => <span className={joinClassNames("size-2 shrink-0 rounded-full", STATUS_STYLES[status].dot)} />;

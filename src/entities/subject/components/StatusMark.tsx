import { joinClassNames } from "@/shared/lib";
import { Icon } from "@/shared/ui";
import { STATUS_LABELS, STATUS_STYLES } from "@/entities/subject/constants/subject.constant";
import type { Status } from "@/entities/subject/interfaces/subject.interface";

interface IStatusMarkProps {
  status: Status;
}

export const StatusMark = ({ status }: IStatusMarkProps) => (
  <span
    role="img"
    aria-label={STATUS_LABELS[status]}
    title={STATUS_LABELS[status]}
    className={joinClassNames("grid size-5 shrink-0 place-items-center rounded-md border-2", STATUS_STYLES[status].mark)}
  >
    {status === "done" && <Icon name="check" className="size-3.5" />}
  </span>
);

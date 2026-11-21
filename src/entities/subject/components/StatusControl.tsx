import { type ISegmentedOption, Segmented } from "@/shared/ui";
import { STATUS_LABELS, STATUS_STYLES, STATUSES } from "@/entities/subject/constants/subject.constant";
import type { Status } from "@/entities/subject/interfaces/subject.interface";

interface IStatusControlProps {
  value: Status;
  onChange: (status: Status) => void;
}

const STATUS_OPTIONS: ISegmentedOption<Status>[] = STATUSES.map((status) => ({
  value: status,
  label: STATUS_LABELS[status],
  activeClassName: STATUS_STYLES[status].active,
}));

export const StatusControl = ({ value, onChange }: IStatusControlProps) => <Segmented options={STATUS_OPTIONS} value={value} onChange={onChange} />;

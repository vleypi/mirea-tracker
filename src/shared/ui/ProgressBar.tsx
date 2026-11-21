import { joinClassNames } from "@/shared/lib";

interface IProgressBarProps {
  total: number;
  done: number;
  submitted: number;
  trackClassName?: string;
}

const toPercent = (value: number, total: number): number => (total ? (value / total) * 100 : 0);

export const ProgressBar = ({ total, done, submitted, trackClassName = "bg-zinc-100" }: IProgressBarProps) => {
  const donePercent = toPercent(done, total);
  return (
    <svg className={joinClassNames("block h-2 w-full overflow-hidden rounded-full", trackClassName)} aria-hidden="true">
      <rect width={`${donePercent}%`} height="100%" className="fill-emerald-500" />
      <rect x={`${donePercent}%`} width={`${toPercent(submitted, total)}%`} height="100%" className="fill-amber-400" />
    </svg>
  );
};

import { joinClassNames } from "@/shared/lib";

interface IOverviewStatProps {
  label: string;
  value: string | number;
  dotClassName: string;
}

export const OverviewStat = ({ label, value, dotClassName }: IOverviewStatProps) => (
  <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm shadow-sm">
    <span className={joinClassNames("size-2 rounded-full", dotClassName)} />
    <dt className="text-zinc-500">{label}</dt>
    <dd className="font-semibold tabular-nums">{value}</dd>
  </div>
);

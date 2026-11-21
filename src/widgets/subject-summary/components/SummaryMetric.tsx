import { joinClassNames } from "@/shared/lib";

interface ISummaryMetricProps {
  label: string;
  value: string | number;
  total?: string | number;
  alert?: boolean;
}

export const SummaryMetric = ({ label, value, total, alert = false }: ISummaryMetricProps) => (
  <div>
    <dt className="text-xs text-zinc-400">{label}</dt>
    <dd className={joinClassNames("mt-1 text-2xl font-semibold tabular-nums", alert ? "text-rose-400" : "text-white")}>
      {value}
      {total !== undefined && <span className="text-base font-medium text-zinc-500">{` / ${total}`}</span>}
    </dd>
  </div>
);

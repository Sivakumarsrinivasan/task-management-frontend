import { ArrowUpRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface SummaryCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  increase?: string;
}

const SummaryCard = ({
  title,
  value,
  icon: Icon,
  color,
  bgColor,
  increase,
}: SummaryCardProps) => {
  return (
    <div className="group rounded-3xl border border-custom bg-surface p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      <div className="flex items-start justify-between">

        <div>
          <p className="text-sm font-medium text-muted-custom">
            {title}
          </p>

          <h2 className="mt-3 text-4xl font-bold text-main">
            {value}
          </h2>

          {increase && (
            <div className="mt-4 flex items-center gap-2 text-sm">

              <ArrowUpRight
                size={16}
                className="text-green-500"
              />

              <span className="font-medium text-green-500">
                {increase}
              </span>

              <span className="text-muted-custom">
                this week
              </span>

            </div>
          )}
        </div>

        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl ${bgColor}`}
        >
          <Icon
            size={26}
            className={color}
          />
        </div>

      </div>

    </div>
  );
};

export default SummaryCard;
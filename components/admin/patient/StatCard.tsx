import clsx from "clsx";
import { LucideIcon } from "lucide-react";

export const StatCard = ({
  icon: Icon,
  title,
  value,
  color,
}: {
  icon: LucideIcon;
  title: string;
  value: string | number;
  color: string;
}) => (
  <div className="bg-[--card] p-2 rounded-lg flex flex-col items-start gap-4 border border-border">
    <div className="flex items-center justify-between gap-2">
        <div className={clsx("rounded-full p-2", color)}>
            <Icon className="w-5 h-5 text-white" />
        </div>
        <p className="text-xl font-bold text-foreground">{value}</p>
    </div>
    <div>
      <p className="text-sm text-muted-foreground">{title}</p>
    </div>
  </div>
);

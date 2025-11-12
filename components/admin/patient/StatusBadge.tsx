import clsx from "clsx";
import { AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { JSX } from "react";

export const StatusBadge = ({ status }: { status: string }) => {
  const baseClasses =
    "text-xs font-medium me-2 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1";
  const statusStyles: Record<string, string> = {
    completed: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    cancelled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    no_show: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  };
  const statusIcons: Record<string, JSX.Element> = {
    completed: <CheckCircle className="w-3 h-3" />,
    cancelled: <XCircle className="w-3 h-3" />,
    no_show: <AlertTriangle className="w-3 h-3" />,
  };

  return (
    <span className={clsx(baseClasses, statusStyles[status] || "bg-gray-100 text-gray-800")}>
      {statusIcons[status] || null}
      {status.replace("_", " ").toUpperCase()}
    </span>
  );
};
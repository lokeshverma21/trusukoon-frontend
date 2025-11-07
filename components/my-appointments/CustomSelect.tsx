import { ChevronDown } from "lucide-react";
import { FC } from "react";

export const CustomSelect: FC<{
  children: React.ReactNode;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}> = ({ children, ...props }) => (
  <div className="relative">
    <select
      {...props}
      className="appearance-none w-full bg-white/50 border border-border rounded-lg py-2 pl-3 pr-8 text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary transition-colors"
    >
      {children}
    </select>
    <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-foreground/50" />
  </div>
);

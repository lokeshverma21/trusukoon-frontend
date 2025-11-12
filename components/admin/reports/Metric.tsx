interface MetricProps {
  label: string;
  value: string | number;
}

export default function Metric({ label, value }: MetricProps) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

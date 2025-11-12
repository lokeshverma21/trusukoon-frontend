import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface InsightCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export default function InsightCard({ title, description, children }: InsightCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
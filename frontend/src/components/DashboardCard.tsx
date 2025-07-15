import { LucideIcon } from "lucide-react";

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color?: string;
}

export default function DashboardCard({ title, value, icon: Icon, color = "bg-cyan-600" }: DashboardCardProps) {
  return (
    <div className={`rounded-2xl p-4 text-white shadow-md ${color}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm">{title}</p>
          <h2 className="text-2xl font-bold">{value}</h2>
        </div>
        <Icon className="w-8 h-8 opacity-70" />
      </div>
    </div>
  );
}

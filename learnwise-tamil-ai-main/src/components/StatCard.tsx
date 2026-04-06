import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: { value: number; positive: boolean };
  delay?: number;
}

export default function StatCard({ title, value, subtitle, icon: Icon, trend, delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="glass rounded-xl p-5 card-glow hover:border-primary/30 transition-colors"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-muted-foreground text-xs font-medium uppercase tracking-wider">{title}</p>
          <p className="text-2xl font-bold mt-1 font-display">{value}</p>
          {subtitle && <p className="text-muted-foreground text-xs mt-1">{subtitle}</p>}
          {trend && (
            <p className={`text-xs mt-1 ${trend.positive ? "text-success" : "text-destructive"}`}>
              {trend.positive ? "↑" : "↓"} {Math.abs(trend.value)}% from last month
            </p>
          )}
        </div>
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon className="w-5 h-5 text-primary" />
        </div>
      </div>
    </motion.div>
  );
}

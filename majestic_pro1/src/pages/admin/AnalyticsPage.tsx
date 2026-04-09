import { motion } from "framer-motion";
import { BarChart3 } from "lucide-react";
import StatCard from "@/components/StatCard";
import { Users, BookOpen, ClipboardCheck, Video } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const monthlyData = [
  { month: "Jan", students: 140, attendance: 88 },
  { month: "Feb", students: 148, attendance: 91 },
  { month: "Mar", students: 152, attendance: 85 },
  { month: "Apr", students: 156, attendance: 92 },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-display font-bold flex items-center gap-2"><BarChart3 className="w-6 h-6 text-primary" /> Analytics</h1>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Students" value="156" icon={Users} delay={0.1} />
        <StatCard title="Total Teachers" value="12" icon={BookOpen} delay={0.15} />
        <StatCard title="Avg Attendance" value="92%" icon={ClipboardCheck} delay={0.2} />
        <StatCard title="Videos" value="42" icon={Video} delay={0.25} />
      </div>

      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass rounded-xl p-5">
        <h3 className="font-display font-semibold text-sm mb-4">Monthly Trends</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(216, 25%, 22%)" />
            <XAxis dataKey="month" tick={{ fill: "hsl(216, 15%, 65%)", fontSize: 12 }} />
            <YAxis tick={{ fill: "hsl(216, 15%, 65%)", fontSize: 12 }} />
            <Tooltip contentStyle={{ backgroundColor: "hsl(216, 40%, 18%)", border: "1px solid hsl(216, 25%, 28%)", borderRadius: "8px", color: "#fff" }} />
            <Bar dataKey="students" fill="hsl(43, 65%, 52%)" radius={[6, 6, 0, 0]} />
            <Bar dataKey="attendance" fill="hsl(199, 89%, 48%)" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}

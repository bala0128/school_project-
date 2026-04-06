import { motion } from "framer-motion";
import StatCard from "@/components/StatCard";
import { Users, GraduationCap, School, BarChart3, TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

const monthlyEnrollment = [
  { month: "Jun", students: 1200 },
  { month: "Jul", students: 1250 },
  { month: "Aug", students: 1280 },
  { month: "Sep", students: 1310 },
  { month: "Oct", students: 1350 },
  { month: "Nov", students: 1380 },
];

const departmentPerformance = [
  { dept: "Science", avg: 85, fill: "hsl(43, 65%, 52%)" },
  { dept: "Maths", avg: 82, fill: "hsl(199, 89%, 48%)" },
  { dept: "English", avg: 78, fill: "hsl(142, 71%, 45%)" },
  { dept: "Tamil", avg: 88, fill: "hsl(280, 65%, 55%)" },
  { dept: "Social", avg: 80, fill: "hsl(38, 92%, 50%)" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl md:text-3xl font-display font-bold">
          Admin <span className="text-gold-gradient">Dashboard</span>
        </h1>
        <p className="text-muted-foreground text-sm mt-1">School-wide performance overview</p>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Students" value="1,380" icon={Users} trend={{ value: 3, positive: true }} delay={0.1} />
        <StatCard title="Teachers" value="64" icon={GraduationCap} delay={0.15} />
        <StatCard title="Classes" value="42" icon={School} delay={0.2} />
        <StatCard title="Avg Performance" value="83%" icon={BarChart3} trend={{ value: 4, positive: true }} delay={0.25} />
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass rounded-xl p-5">
          <h3 className="font-display font-semibold text-sm mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-primary" /> Enrollment Trend
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={monthlyEnrollment}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(216, 25%, 22%)" />
              <XAxis dataKey="month" tick={{ fill: "hsl(216, 15%, 65%)", fontSize: 12 }} />
              <YAxis tick={{ fill: "hsl(216, 15%, 65%)", fontSize: 12 }} />
              <Tooltip contentStyle={{ backgroundColor: "hsl(216, 40%, 18%)", border: "1px solid hsl(216, 25%, 28%)", borderRadius: "8px", color: "#fff" }} />
              <Line type="monotone" dataKey="students" stroke="hsl(43, 65%, 52%)" strokeWidth={2} dot={{ fill: "hsl(43, 65%, 52%)" }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="glass rounded-xl p-5">
          <h3 className="font-display font-semibold text-sm mb-4">Department Performance</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={departmentPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(216, 25%, 22%)" />
              <XAxis dataKey="dept" tick={{ fill: "hsl(216, 15%, 65%)", fontSize: 12 }} />
              <YAxis tick={{ fill: "hsl(216, 15%, 65%)", fontSize: 12 }} domain={[0, 100]} />
              <Tooltip contentStyle={{ backgroundColor: "hsl(216, 40%, 18%)", border: "1px solid hsl(216, 25%, 28%)", borderRadius: "8px", color: "#fff" }} />
              <Bar dataKey="avg" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
}

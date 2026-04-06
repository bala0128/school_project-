import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import StatCard from "@/components/StatCard";
import { Users, ClipboardCheck, Upload, MessageCircle, BookOpen, TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const classPerformance = [
  { class: "10-A", avg: 82, fill: "hsl(43, 65%, 52%)" },
  { class: "10-B", avg: 76, fill: "hsl(199, 89%, 48%)" },
  { class: "9-A", avg: 88, fill: "hsl(142, 71%, 45%)" },
  { class: "9-B", avg: 71, fill: "hsl(280, 65%, 55%)" },
];

const recentTasks = [
  { text: "Review 10-A Math Quiz submissions", status: "pending", icon: "📝" },
  { text: "Upload Chapter 5 Video", status: "done", icon: "🎥" },
  { text: "Mark 9-B attendance", status: "pending", icon: "✅" },
  { text: "Parent meeting - Arjun's progress", status: "upcoming", icon: "💬" },
];

export default function TeacherDashboard() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl md:text-3xl font-display font-bold">
          Welcome, <span className="text-gold-gradient">{user?.name}</span>
        </h1>
        <p className="text-muted-foreground text-sm mt-1">{user?.subject} Department • Today's Overview</p>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Students" value="156" icon={Users} delay={0.1} />
        <StatCard title="Attendance Today" value="92%" icon={ClipboardCheck} trend={{ value: 1, positive: true }} delay={0.15} />
        <StatCard title="Videos Uploaded" value="42" icon={Upload} subtitle="This term" delay={0.2} />
        <StatCard title="Messages" value="8" icon={MessageCircle} subtitle="Unread" delay={0.25} />
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass rounded-xl p-5">
          <h3 className="font-display font-semibold text-sm mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-primary" /> Class Average Performance
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={classPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(216, 25%, 22%)" />
              <XAxis dataKey="class" tick={{ fill: "hsl(216, 15%, 65%)", fontSize: 12 }} />
              <YAxis tick={{ fill: "hsl(216, 15%, 65%)", fontSize: 12 }} domain={[0, 100]} />
              <Tooltip contentStyle={{ backgroundColor: "hsl(216, 40%, 18%)", border: "1px solid hsl(216, 25%, 28%)", borderRadius: "8px", color: "#fff" }} />
              <Bar dataKey="avg" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="glass rounded-xl p-5">
          <h3 className="font-display font-semibold text-sm mb-4 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-primary" /> Today's Tasks
          </h3>
          <div className="space-y-3">
            {recentTasks.map((task, i) => (
              <div key={i} className="flex items-start gap-3 p-2 rounded-lg hover:bg-secondary/30 transition-colors">
                <span className="text-lg">{task.icon}</span>
                <div className="flex-1">
                  <p className="text-sm font-medium">{task.text}</p>
                  <span className={`text-[10px] uppercase tracking-wider font-medium ${
                    task.status === "done" ? "text-success" : task.status === "pending" ? "text-warning" : "text-info"
                  }`}>{task.status}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

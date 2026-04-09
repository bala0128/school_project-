import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import StatCard from "@/components/StatCard";
import { CalendarDays, BookOpen, Trophy, Target, TrendingUp, Star, Flame } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar } from "recharts";

const subjectMarks = [
  { subject: "Maths", marks: 92, fill: "hsl(43, 65%, 52%)" },
  { subject: "Science", marks: 88, fill: "hsl(199, 89%, 48%)" },
  { subject: "English", marks: 76, fill: "hsl(142, 71%, 45%)" },
  { subject: "Tamil", marks: 85, fill: "hsl(280, 65%, 55%)" },
  { subject: "Social", marks: 80, fill: "hsl(38, 92%, 50%)" },
];

const attendanceData = [{ name: "Attendance", value: 94, fill: "hsl(43, 65%, 52%)" }];

const leaderboard = [
  { rank: 1, name: "Priya S.", points: 2450, avatar: "P" },
  { rank: 2, name: "Arjun K.", points: 2380, avatar: "A" },
  { rank: 3, name: "Divya R.", points: 2310, avatar: "D" },
  { rank: 4, name: "Karthik M.", points: 2200, avatar: "K" },
  { rank: 5, name: "Sneha V.", points: 2150, avatar: "S" },
];

const recentActivity = [
  { text: "Completed Physics Quiz", time: "2 hours ago", icon: "🧪" },
  { text: "Watched: Bernoulli's Theorem", time: "5 hours ago", icon: "🎥" },
  { text: "Earned 'Science Star' badge", time: "Yesterday", icon: "🏅" },
  { text: "Submitted Math Assignment", time: "2 days ago", icon: "📝" },
];

export default function StudentDashboard() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl md:text-3xl font-display font-bold">
          Welcome back, <span className="text-gold-gradient">{user?.name?.split(" ")[0]}</span>
        </h1>
        <p className="text-muted-foreground text-sm mt-1">Class {user?.class} • Here's your progress overview</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Attendance" value="94%" icon={CalendarDays} trend={{ value: 2, positive: true }} delay={0.1} />
        <StatCard title="Avg. Marks" value="84%" icon={Target} trend={{ value: 5, positive: true }} delay={0.15} />
        <StatCard title="Quizzes Done" value="28" icon={BookOpen} subtitle="This semester" delay={0.2} />
        <StatCard title="Rank" value="#2" icon={Trophy} subtitle="Class 10-A" delay={0.25} />
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-3 gap-4">
        {/* Subject Performance */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 glass rounded-xl p-5"
        >
          <h3 className="font-display font-semibold text-sm mb-4">Subject Performance</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={subjectMarks}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(216, 25%, 22%)" />
              <XAxis dataKey="subject" tick={{ fill: "hsl(216, 15%, 65%)", fontSize: 12 }} />
              <YAxis tick={{ fill: "hsl(216, 15%, 65%)", fontSize: 12 }} domain={[0, 100]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(216, 40%, 18%)",
                  border: "1px solid hsl(216, 25%, 28%)",
                  borderRadius: "8px",
                  color: "#fff",
                }}
              />
              <Bar dataKey="marks" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Attendance Ring */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="glass rounded-xl p-5 flex flex-col items-center justify-center"
        >
          <h3 className="font-display font-semibold text-sm mb-2">Attendance</h3>
          <div className="relative">
            <ResponsiveContainer width={160} height={160}>
              <RadialBarChart cx="50%" cy="50%" innerRadius="70%" outerRadius="100%" data={attendanceData} startAngle={90} endAngle={-270}>
                <RadialBar dataKey="value" cornerRadius={10} background={{ fill: "hsl(216, 25%, 22%)" }} />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold font-display text-gold-gradient">94%</span>
            </div>
          </div>
          <p className="text-muted-foreground text-xs mt-2">188 / 200 days</p>
        </motion.div>
      </div>

      {/* Bottom Row */}
      <div className="grid lg:grid-cols-2 gap-4">
        {/* Leaderboard */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass rounded-xl p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <Flame className="w-4 h-4 text-primary" />
            <h3 className="font-display font-semibold text-sm">Class Leaderboard</h3>
          </div>
          <div className="space-y-3">
            {leaderboard.map((item) => (
              <div
                key={item.rank}
                className={`flex items-center gap-3 p-2.5 rounded-lg transition-colors ${
                  item.name.includes("Arjun") ? "bg-primary/10 border border-primary/20" : "hover:bg-secondary/30"
                }`}
              >
                <span className={`w-6 text-center font-bold text-sm ${
                  item.rank <= 3 ? "text-primary" : "text-muted-foreground"
                }`}>
                  {item.rank <= 3 ? ["🥇", "🥈", "🥉"][item.rank - 1] : `#${item.rank}`}
                </span>
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-bold">
                  {item.avatar}
                </div>
                <span className="flex-1 text-sm font-medium">{item.name}</span>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Star className="w-3 h-3 text-primary" />
                  {item.points}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="glass rounded-xl p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-4 h-4 text-primary" />
            <h3 className="font-display font-semibold text-sm">Recent Activity</h3>
          </div>
          <div className="space-y-4">
            {recentActivity.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-lg">{item.icon}</span>
                <div>
                  <p className="text-sm font-medium">{item.text}</p>
                  <p className="text-xs text-muted-foreground">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

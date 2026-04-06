import { motion } from "framer-motion";
import { Trophy, Medal, Crown } from "lucide-react";

const leaderboard = [
  { rank: 1, name: "Priya S.", score: 2450, avatar: "P" },
  { rank: 2, name: "Arjun K.", score: 2380, avatar: "A" },
  { rank: 3, name: "Meena R.", score: 2310, avatar: "M" },
  { rank: 4, name: "Karthik V.", score: 2200, avatar: "K" },
  { rank: 5, name: "Deepa L.", score: 2150, avatar: "D" },
  { rank: 6, name: "Ravi M.", score: 2080, avatar: "R" },
  { rank: 7, name: "Shalini T.", score: 1990, avatar: "S" },
  { rank: 8, name: "Vijay P.", score: 1920, avatar: "V" },
];

const rankIcon = (rank: number) => {
  if (rank === 1) return <Crown className="w-5 h-5 text-yellow-400" />;
  if (rank === 2) return <Medal className="w-5 h-5 text-gray-300" />;
  if (rank === 3) return <Medal className="w-5 h-5 text-amber-600" />;
  return <span className="text-sm font-bold text-muted-foreground w-5 text-center">{rank}</span>;
};

export default function LeaderboardPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-display font-bold flex items-center gap-2">
          <Trophy className="w-6 h-6 text-primary" /> Leaderboard
        </h1>
        <p className="text-muted-foreground text-sm mt-1">Top performers this month</p>
      </motion.div>

      <div className="space-y-2">
        {leaderboard.map((entry, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
            className={`flex items-center gap-4 p-4 rounded-xl transition-colors ${entry.rank <= 3 ? "glass border border-primary/20" : "bg-secondary/20"}`}>
            {rankIcon(entry.rank)}
            <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary">
              {entry.avatar}
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold">{entry.name}</p>
            </div>
            <p className="text-sm font-bold text-primary">{entry.score.toLocaleString()} pts</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

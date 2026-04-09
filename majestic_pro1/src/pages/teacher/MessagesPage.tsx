import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const messages = [
  { from: "Priya's Parent", text: "Can we discuss Priya's math performance?", time: "2h ago", unread: true },
  { from: "Admin Office", text: "Staff meeting scheduled for Friday 3 PM", time: "5h ago", unread: true },
  { from: "Arjun K.", text: "Sir, I missed the last class. Can you share notes?", time: "1d ago", unread: false },
  { from: "Meena's Parent", text: "Thank you for the extra coaching sessions", time: "2d ago", unread: false },
];

export default function MessagesPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-display font-bold flex items-center gap-2">
          <MessageCircle className="w-6 h-6 text-primary" /> Messages
        </h1>
        <p className="text-muted-foreground text-sm mt-1">Communication with parents and students</p>
      </motion.div>

      <div className="space-y-2">
        {messages.map((m, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card className={`glass border-border/30 cursor-pointer hover:border-primary/30 transition-colors ${m.unread ? "border-l-2 border-l-primary" : ""}`}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-semibold">{m.from}</p>
                  <span className="text-[10px] text-muted-foreground">{m.time}</span>
                </div>
                <p className="text-xs text-muted-foreground">{m.text}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

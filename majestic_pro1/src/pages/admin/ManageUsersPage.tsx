import { motion } from "framer-motion";
import { Users, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

const users = [
  { name: "Mr. Rajesh", email: "rajesh@school.com", role: "teacher", subject: "Mathematics" },
  { name: "Ms. Lakshmi", email: "lakshmi@school.com", role: "teacher", subject: "Physics" },
  { name: "Priya S.", email: "priya@school.com", role: "student", class: "10-A" },
  { name: "Arjun K.", email: "arjun@school.com", role: "student", class: "10-A" },
  { name: "Admin User", email: "admin@school.com", role: "admin", subject: "" },
];

export default function ManageUsersPage() {
  const [search, setSearch] = useState("");
  const filtered = users.filter(u => u.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-display font-bold flex items-center gap-2"><Users className="w-6 h-6 text-primary" /> Manage Users</h1>
        <p className="text-muted-foreground text-sm mt-1">View and manage all users</p>
      </motion.div>
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input placeholder="Search users..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10 bg-secondary/30 border-border/30" />
      </div>
      <div className="space-y-2">
        {filtered.map((u, i) => (
          <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}>
            <Card className="glass border-border/30">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary">{u.name.charAt(0)}</div>
                <div className="flex-1">
                  <p className="text-sm font-semibold">{u.name}</p>
                  <p className="text-xs text-muted-foreground">{u.email}</p>
                </div>
                <Badge variant="outline" className="capitalize">{u.role}</Badge>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

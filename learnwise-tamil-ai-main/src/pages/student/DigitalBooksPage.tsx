import { motion } from "framer-motion";
import { BookOpen, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const books = [
  { title: "Mathematics – Class 10", subject: "Mathematics", chapters: 15, icon: "📐" },
  { title: "Physics – Class 10", subject: "Physics", chapters: 12, icon: "⚛️" },
  { title: "Chemistry – Class 10", subject: "Chemistry", chapters: 14, icon: "🧪" },
  { title: "Biology – Class 10", subject: "Biology", chapters: 16, icon: "🧬" },
  { title: "Tamil – Class 10", subject: "Tamil", chapters: 10, icon: "📖" },
  { title: "English – Class 10", subject: "English", chapters: 13, icon: "📝" },
];

export default function DigitalBooksPage() {
  const [search, setSearch] = useState("");
  const filtered = books.filter(b => b.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-display font-bold">Digital Books</h1>
        <p className="text-muted-foreground text-sm mt-1">Access your textbooks digitally</p>
      </motion.div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input placeholder="Search books..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10 bg-secondary/30 border-border/30" />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((book, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="glass rounded-xl p-5 hover:border-primary/30 transition-colors cursor-pointer border border-border/30">
            <div className="text-3xl mb-3">{book.icon}</div>
            <h3 className="font-display font-semibold text-sm">{book.title}</h3>
            <p className="text-xs text-muted-foreground mt-1">{book.chapters} Chapters</p>
            <Badge variant="outline" className="mt-3 text-[10px]">{book.subject}</Badge>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

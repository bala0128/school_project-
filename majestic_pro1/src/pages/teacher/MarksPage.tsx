import { motion } from "framer-motion";
import { BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const marksData = [
  { name: "Priya S.", math: 92, physics: 88, chemistry: 85 },
  { name: "Arjun K.", math: 78, physics: 82, chemistry: 76 },
  { name: "Meena R.", math: 95, physics: 90, chemistry: 92 },
  { name: "Karthik V.", math: 68, physics: 72, chemistry: 70 },
  { name: "Deepa L.", math: 85, physics: 80, chemistry: 88 },
];

export default function MarksPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-display font-bold flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-primary" /> Marks
        </h1>
        <p className="text-muted-foreground text-sm mt-1">View and manage student marks</p>
      </motion.div>

      <Card className="glass border-border/30">
        <CardHeader><CardTitle className="text-sm font-display">Class 10-A – Unit Test 1</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead className="text-center">Math</TableHead>
                <TableHead className="text-center">Physics</TableHead>
                <TableHead className="text-center">Chemistry</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {marksData.map((s, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">{s.name}</TableCell>
                  <TableCell className="text-center">{s.math}</TableCell>
                  <TableCell className="text-center">{s.physics}</TableCell>
                  <TableCell className="text-center">{s.chemistry}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

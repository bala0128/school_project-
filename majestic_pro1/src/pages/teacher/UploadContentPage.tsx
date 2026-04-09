import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, Video, CheckCircle, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const subjects = ["Mathematics", "Physics", "Chemistry", "Biology", "Tamil", "English"];
const classes = ["9-A", "9-B", "10-A", "10-B"];

export default function UploadContentPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ title: "", subject: "", class: "", topic: "", videoUrl: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.subject || !form.videoUrl) {
      toast.error("Please fill in required fields");
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.from("videos").insert({
        title: form.title,
        subject: form.subject,
        class: form.class || null,
        topic: form.topic || null,
        video_url: form.videoUrl,
        uploaded_by: user?.id || null,
      });
      if (error) throw error;
      toast.success("Video uploaded successfully!");
      setForm({ title: "", subject: "", class: "", topic: "", videoUrl: "" });
    } catch (err: any) {
      toast.error(err.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-display font-bold flex items-center gap-2">
          <Upload className="w-6 h-6 text-primary" /> Upload Content
        </h1>
        <p className="text-muted-foreground text-sm mt-1">Add videos for your students</p>
      </motion.div>

      <Card className="glass border-border/30">
        <CardHeader>
          <CardTitle className="text-sm font-display flex items-center gap-2">
            <Video className="w-4 h-4 text-primary" /> New Video
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Title *</label>
              <Input placeholder="e.g. Quadratic Equations – Part 1" value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} className="bg-secondary/30 border-border/30" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Subject *</label>
                <Select value={form.subject} onValueChange={v => setForm(p => ({ ...p, subject: v }))}>
                  <SelectTrigger className="bg-secondary/30 border-border/30"><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>{subjects.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Class</label>
                <Select value={form.class} onValueChange={v => setForm(p => ({ ...p, class: v }))}>
                  <SelectTrigger className="bg-secondary/30 border-border/30"><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>{classes.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Topic</label>
              <Input placeholder="e.g. Algebra" value={form.topic} onChange={e => setForm(p => ({ ...p, topic: e.target.value }))} className="bg-secondary/30 border-border/30" />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Video URL *</label>
              <Input placeholder="https://youtube.com/watch?v=..." value={form.videoUrl} onChange={e => setForm(p => ({ ...p, videoUrl: e.target.value }))} className="bg-secondary/30 border-border/30" />
            </div>
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <CheckCircle className="w-4 h-4 mr-2" />}
              {loading ? "Uploading..." : "Upload Video"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

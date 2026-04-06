import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlayCircle, Search, Filter, Clock, BookOpen, X, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Video {
  id: string;
  title: string;
  subject: string;
  topic: string;
  duration: string;
  thumbnail: string;
  videoUrl: string;
  class: string;
}

const MOCK_VIDEOS: Video[] = [
  { id: "1", title: "Photosynthesis – Light & Dark Reactions", subject: "Biology", topic: "Plant Physiology", duration: "18:30", thumbnail: "https://img.youtube.com/vi/sQK3Yr4Sc_k/hqdefault.jpg", videoUrl: "https://www.youtube.com/embed/sQK3Yr4Sc_k", class: "10" },
  { id: "2", title: "Newton's Laws of Motion", subject: "Physics", topic: "Mechanics", duration: "22:15", thumbnail: "https://img.youtube.com/vi/kKKM8Y-u7ds/hqdefault.jpg", videoUrl: "https://www.youtube.com/embed/kKKM8Y-u7ds", class: "10" },
  { id: "3", title: "Quadratic Equations – Solving Methods", subject: "Mathematics", topic: "Algebra", duration: "25:00", thumbnail: "https://img.youtube.com/vi/IlNAJl36-10/hqdefault.jpg", videoUrl: "https://www.youtube.com/embed/IlNAJl36-10", class: "10" },
  { id: "4", title: "Chemical Reactions & Equations", subject: "Chemistry", topic: "Chemical Reactions", duration: "20:45", thumbnail: "https://img.youtube.com/vi/TLuPqX8mfXo/hqdefault.jpg", videoUrl: "https://www.youtube.com/embed/TLuPqX8mfXo", class: "10" },
  { id: "5", title: "தமிழ் இலக்கணம் – எழுத்து", subject: "Tamil", topic: "Grammar", duration: "15:20", thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", class: "10" },
  { id: "6", title: "Trigonometry – Basics & Identities", subject: "Mathematics", topic: "Trigonometry", duration: "28:10", thumbnail: "https://img.youtube.com/vi/T9lt2DSqIQo/hqdefault.jpg", videoUrl: "https://www.youtube.com/embed/T9lt2DSqIQo", class: "10" },
  { id: "7", title: "Human Digestive System", subject: "Biology", topic: "Human Body", duration: "19:45", thumbnail: "https://img.youtube.com/vi/nM5kMSjBrmw/hqdefault.jpg", videoUrl: "https://www.youtube.com/embed/nM5kMSjBrmw", class: "10" },
  { id: "8", title: "Electricity – Ohm's Law", subject: "Physics", topic: "Electricity", duration: "24:30", thumbnail: "https://img.youtube.com/vi/HsLLq6Rm5tU/hqdefault.jpg", videoUrl: "https://www.youtube.com/embed/HsLLq6Rm5tU", class: "10" },
];

const subjects = ["All", "Mathematics", "Physics", "Chemistry", "Biology", "Tamil"];

const subjectColors: Record<string, string> = {
  Mathematics: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  Physics: "bg-orange-500/15 text-orange-400 border-orange-500/30",
  Chemistry: "bg-green-500/15 text-green-400 border-green-500/30",
  Biology: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  Tamil: "bg-purple-500/15 text-purple-400 border-purple-500/30",
};

export default function VideoLearningPage() {
  const [search, setSearch] = useState("");
  const [subject, setSubject] = useState("All");
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const filtered = useMemo(() => {
    return MOCK_VIDEOS.filter((v) => {
      const matchSearch = v.title.toLowerCase().includes(search.toLowerCase()) ||
        v.topic.toLowerCase().includes(search.toLowerCase());
      const matchSubject = subject === "All" || v.subject === subject;
      return matchSearch && matchSubject;
    });
  }, [search, subject]);

  const topics = useMemo(() => {
    const grouped: Record<string, Video[]> = {};
    filtered.forEach((v) => {
      if (!grouped[v.topic]) grouped[v.topic] = [];
      grouped[v.topic].push(v);
    });
    return grouped;
  }, [filtered]);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-display font-bold flex items-center gap-2">
          <PlayCircle className="w-6 h-6 text-primary" />
          Video Learning
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Watch topic-wise lessons from expert teachers</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search videos or topics..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={subject} onValueChange={setSubject}>
          <SelectTrigger className="w-full sm:w-48">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {subjects.map((s) => (
              <SelectItem key={s} value={s}>{s}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Subject chips */}
      <div className="flex gap-2 flex-wrap">
        {subjects.map((s) => (
          <button
            key={s}
            onClick={() => setSubject(s)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
              subject === s
                ? "bg-primary text-primary-foreground border-primary"
                : "border-border/50 text-muted-foreground hover:text-foreground hover:border-border"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Videos by topic */}
      {Object.keys(topics).length === 0 ? (
        <div className="text-center py-16">
          <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">No videos found. Try a different search or filter.</p>
        </div>
      ) : (
        Object.entries(topics).map(([topic, videos]) => (
          <div key={topic}>
            <h2 className="text-base font-semibold mb-3 flex items-center gap-2">
              <ChevronRight className="w-4 h-4 text-primary" />
              {topic}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {videos.map((video, i) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Card
                    className="cursor-pointer group hover:border-primary/40 transition-all overflow-hidden"
                    onClick={() => setSelectedVideo(video)}
                  >
                    <div className="relative aspect-video bg-secondary overflow-hidden">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <PlayCircle className="w-12 h-12 text-white" />
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] px-1.5 py-0.5 rounded flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {video.duration}
                      </div>
                    </div>
                    <CardContent className="p-3">
                      <h3 className="text-sm font-medium line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                        {video.title}
                      </h3>
                      <Badge variant="outline" className={`text-[10px] ${subjectColors[video.subject] || ""}`}>
                        {video.subject}
                      </Badge>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        ))
      )}

      {/* Video Player Dialog */}
      <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden">
          <DialogHeader className="p-4 pb-0">
            <DialogTitle className="text-base font-display pr-6">{selectedVideo?.title}</DialogTitle>
            <div className="flex gap-2 mt-1">
              <Badge variant="outline" className={`text-[10px] ${subjectColors[selectedVideo?.subject || ""] || ""}`}>
                {selectedVideo?.subject}
              </Badge>
              <Badge variant="outline" className="text-[10px]">{selectedVideo?.topic}</Badge>
            </div>
          </DialogHeader>
          <div className="aspect-video w-full">
            {selectedVideo && (
              <iframe
                src={selectedVideo.videoUrl + "?autoplay=1"}
                title={selectedVideo.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

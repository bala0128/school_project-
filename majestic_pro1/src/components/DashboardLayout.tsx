import { ReactNode, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, CalendarDays, PlayCircle, BookOpen,
  BrainCircuit, Trophy, BarChart3, MessageCircle, Upload, ClipboardList,
  Users, Settings, LogOut, Menu, X, ChevronRight, Bell
} from "lucide-react";
import { NavLink } from "react-router-dom";
import majesticLogo from "@/assets/majestic_logo.jpg";

interface DashboardLayoutProps {
  children: ReactNode;
}

const navItems = {
  student: [
    { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/attendance", icon: CalendarDays, label: "Attendance" },
    { to: "/videos", icon: PlayCircle, label: "Video Learning" },
    { to: "/books", icon: BookOpen, label: "Digital Books" },
    { to: "/quiz", icon: BrainCircuit, label: "Quizzes" },
    { to: "/ai-assistant", icon: BrainCircuit, label: "AI Assistant" },
    { to: "/leaderboard", icon: Trophy, label: "Leaderboard" },
    { to: "/career", icon: BarChart3, label: "Career" },
  ],
  teacher: [
    { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/upload-content", icon: Upload, label: "Upload Content" },
    { to: "/quiz-manage", icon: ClipboardList, label: "Quiz Management" },
    { to: "/attendance-entry", icon: CalendarDays, label: "Attendance" },
    { to: "/marks", icon: BarChart3, label: "Marks" },
    { to: "/messages", icon: MessageCircle, label: "Messages" },
  ],
  admin: [
    { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/manage-users", icon: Users, label: "Manage Users" },
    { to: "/analytics", icon: BarChart3, label: "Analytics" },
    { to: "/syllabus", icon: BookOpen, label: "Syllabus" },
    { to: "/settings", icon: Settings, label: "Settings" },
  ],
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const items = navItems[user?.role || "student"];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-navy-deep/60 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-64 bg-navy-deep border-r border-border/30 flex flex-col transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="p-5 flex items-center gap-3 border-b border-border/30">
          <img src={majesticLogo} alt="Majestic International School" className="w-9 h-9 rounded-xl object-cover flex-shrink-0" />
          <div>
            <h2 className="font-display text-sm font-bold text-gold-gradient leading-tight">Majestic International</h2>
            <p className="text-[10px] text-muted-foreground capitalize">{user?.role} Portal</p>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden ml-auto text-muted-foreground">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all group ${
                  isActive
                    ? "bg-primary/15 text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                }`
              }
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />
              <span>{item.label}</span>
              <ChevronRight className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
            </NavLink>
          ))}
        </nav>

        {/* User */}
        <div className="p-4 border-t border-border/30">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-full bg-gold-gradient flex items-center justify-center text-primary-foreground font-bold text-sm">
              {user?.name?.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user?.name}</p>
              <p className="text-[10px] text-muted-foreground truncate">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-destructive transition-colors w-full px-2 py-1.5"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-30 h-14 bg-background/80 backdrop-blur-xl border-b border-border/30 flex items-center px-4 gap-4">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-muted-foreground">
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex-1" />
          <button className="relative text-muted-foreground hover:text-foreground transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-primary" />
          </button>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

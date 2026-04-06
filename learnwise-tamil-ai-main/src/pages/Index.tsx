import { useAuth } from "@/contexts/AuthContext";
import LoginPage from "@/pages/LoginPage";
import DashboardLayout from "@/components/DashboardLayout";
import StudentDashboard from "@/pages/student/StudentDashboard";
import TeacherDashboard from "@/pages/teacher/TeacherDashboard";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import QuizPage from "@/pages/student/QuizPage";
import AIAssistantPage from "@/pages/student/AIAssistantPage";
import VideoLearningPage from "@/pages/student/VideoLearningPage";
import AttendancePage from "@/pages/student/AttendancePage";
import DigitalBooksPage from "@/pages/student/DigitalBooksPage";
import LeaderboardPage from "@/pages/student/LeaderboardPage";
import CareerPage from "@/pages/student/CareerPage";
import UploadContentPage from "@/pages/teacher/UploadContentPage";
import QuizManagePage from "@/pages/teacher/QuizManagePage";
import AttendanceEntryPage from "@/pages/teacher/AttendanceEntryPage";
import MarksPage from "@/pages/teacher/MarksPage";
import MessagesPage from "@/pages/teacher/MessagesPage";
import ManageUsersPage from "@/pages/admin/ManageUsersPage";
import AnalyticsPage from "@/pages/admin/AnalyticsPage";
import SyllabusPage from "@/pages/admin/SyllabusPage";
import SettingsPage from "@/pages/admin/SettingsPage";
import { Routes, Route, Navigate } from "react-router-dom";

export default function Index() {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated || !user) return <LoginPage />;

  const dashboardByRole = {
    student: StudentDashboard,
    teacher: TeacherDashboard,
    admin: AdminDashboard,
  };
  const Dashboard = dashboardByRole[user.role];

  return (
    <DashboardLayout>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        {/* Student routes */}
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/ai-assistant" element={<AIAssistantPage />} />
        <Route path="/videos" element={<VideoLearningPage />} />
        <Route path="/attendance" element={<AttendancePage />} />
        <Route path="/books" element={<DigitalBooksPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/career" element={<CareerPage />} />
        {/* Teacher routes */}
        <Route path="/upload-content" element={<UploadContentPage />} />
        <Route path="/quiz-manage" element={<QuizManagePage />} />
        <Route path="/attendance-entry" element={<AttendanceEntryPage />} />
        <Route path="/marks" element={<MarksPage />} />
        <Route path="/messages" element={<MessagesPage />} />
        {/* Admin routes */}
        <Route path="/manage-users" element={<ManageUsersPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/syllabus" element={<SyllabusPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </DashboardLayout>
  );
}

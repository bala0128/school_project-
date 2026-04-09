import React, { createContext, useContext, useState, ReactNode } from "react";

export type UserRole = "student" | "teacher" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  class?: string;
  subject?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Mock users for demo
const MOCK_USERS: Record<string, User> = {
  "student@school.com": {
    id: "s1",
    name: "Arjun Kumar",
    email: "student@school.com",
    role: "student",
    class: "10-A",
  },
  "teacher@school.com": {
    id: "t1",
    name: "Mrs. Lakshmi Devi",
    email: "teacher@school.com",
    role: "teacher",
    subject: "Mathematics",
  },
  "admin@school.com": {
    id: "a1",
    name: "Mr. Rajesh",
    email: "admin@school.com",
    role: "admin",
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, _password: string) => {
    const mockUser = MOCK_USERS[email.toLowerCase()];
    if (mockUser) {
      setUser(mockUser);
    } else {
      throw new Error("Invalid credentials. Try student@school.com, teacher@school.com, or admin@school.com");
    }
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

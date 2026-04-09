import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import { Eye, EyeOff, Sparkles } from "lucide-react";
import majesticLogo from "@/assets/majestic_logo.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const quickLogin = (role: string) => {
    setEmail(`${role}@school.com`);
    setPassword("demo123");
  };

  return (
    <div className="min-h-screen bg-navy-gradient flex items-center justify-center p-4">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-gold/5 blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-gold/3 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <motion.img
            src={majesticLogo}
            alt="Majestic International School"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 rounded-2xl object-cover mx-auto mb-4"
          />
          <h1 className="text-3xl font-display font-bold text-gold-gradient">
            Majestic International School
          </h1>
          <p className="text-muted-foreground mt-2 font-body text-sm">
            AI-Powered Smart Education System
          </p>
        </div>

        {/* Login Card */}
        <div className="glass rounded-2xl p-8 card-glow">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-muted-foreground text-sm">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-secondary/50 border-border/50 focus:border-primary"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-muted-foreground text-sm">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-secondary/50 border-border/50 focus:border-primary pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-destructive text-sm bg-destructive/10 p-3 rounded-lg"
              >
                {error}
              </motion.p>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gold-gradient hover:opacity-90 text-primary-foreground font-semibold h-11"
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>

            <button type="button" className="w-full text-sm text-primary hover:text-gold-light transition-colors">
              Forgot Password?
            </button>
          </form>

          {/* Quick Login */}
          <div className="mt-6 pt-6 border-t border-border/50">
            <p className="text-muted-foreground text-xs text-center mb-3 flex items-center justify-center gap-1">
              <Sparkles className="w-3 h-3" /> Quick Demo Login
            </p>
            <div className="grid grid-cols-3 gap-2">
              {["student", "teacher", "admin"].map((role) => (
                <button
                  key={role}
                  onClick={() => quickLogin(role)}
                  className="text-xs py-2 px-3 rounded-lg bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors capitalize"
                >
                  {role}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

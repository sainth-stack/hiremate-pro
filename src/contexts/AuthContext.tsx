import React, { createContext, useContext, useState, useCallback } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  isNew?: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("hiremate_user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = useCallback(async (email: string, _password: string) => {
    // Mock login
    await new Promise((r) => setTimeout(r, 800));
    const u: User = { id: "1", name: "Alex Johnson", email, isNew: false };
    localStorage.setItem("hiremate_user", JSON.stringify(u));
    setUser(u);
  }, []);

  const register = useCallback(async (name: string, email: string, _password: string) => {
    await new Promise((r) => setTimeout(r, 800));
    const u: User = { id: "1", name, email, isNew: true };
    localStorage.setItem("hiremate_user", JSON.stringify(u));
    setUser(u);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("hiremate_user");
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
}

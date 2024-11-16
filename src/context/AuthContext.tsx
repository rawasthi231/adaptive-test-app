import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

import { logout } from "@/services/auth";
import { IUser } from "@/typings";

interface AuthContextType {
  user: IUser | null;
  loginUser: (data: IUser) => Promise<void>;
  logoutUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      router.push("/auth/login");
    }
  }, []);

  const loginUser = async (data: IUser) => {
    setUser(data);
    localStorage.setItem("user", JSON.stringify(data));
  };

  const logoutUser = async () => {
    await logout();
    localStorage.removeItem("user");
    setUser(null);
    router.push("/auth/login");
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

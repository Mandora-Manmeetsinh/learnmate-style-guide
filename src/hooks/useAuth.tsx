
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/types';
import { toast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('learnmate_user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      // Update streak if last login was yesterday
      const today = new Date().toDateString();
      const lastLogin = new Date(userData.lastLoginDate).toDateString();
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      
      if (lastLogin === yesterday) {
        userData.streak += 1;
      } else if (lastLogin !== today) {
        userData.streak = 1;
      }
      
      userData.lastLoginDate = new Date().toISOString();
      setUser(userData);
      localStorage.setItem('learnmate_user', JSON.stringify(userData));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    const users = JSON.parse(localStorage.getItem('learnmate_users') || '[]');
    const foundUser = users.find((u: any) => u.email === email && u.password === password);
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      const today = new Date().toISOString();
      const updatedUser = { ...userWithoutPassword, lastLoginDate: today };
      setUser(updatedUser);
      localStorage.setItem('learnmate_user', JSON.stringify(updatedUser));
      toast({ title: "Welcome back!", description: "Login successful" });
      return true;
    }
    
    toast({ title: "Login failed", description: "Invalid credentials", variant: "destructive" });
    return false;
  };

  const signup = async (email: string, password: string, name: string): Promise<boolean> => {
    const users = JSON.parse(localStorage.getItem('learnmate_users') || '[]');
    
    if (users.find((u: any) => u.email === email)) {
      toast({ title: "Signup failed", description: "Email already exists", variant: "destructive" });
      return false;
    }

    const newUser: User & { password: string } = {
      id: Date.now().toString(),
      email,
      password,
      name,
      createdAt: new Date().toISOString(),
      xp: 0,
      level: 1,
      streak: 1,
      lastLoginDate: new Date().toISOString(),
      badges: []
    };

    users.push(newUser);
    localStorage.setItem('learnmate_users', JSON.stringify(users));
    
    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    localStorage.setItem('learnmate_user', JSON.stringify(userWithoutPassword));
    
    toast({ title: "Welcome to LearnMate!", description: "Account created successfully" });
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('learnmate_user');
    toast({ title: "Logged out", description: "See you next time!" });
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('learnmate_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      signup,
      logout,
      updateUser,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

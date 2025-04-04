import { createContext, useContext, useState, ReactNode } from "react";
import { User } from "../types/userTypes";
import { PlayerConfigForm } from "../types/formTypes";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUserInfo: (data: Partial<User>) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

// Usuário mockado inicial
const mockUser: User = {
  id: "1",
  name: "Usuário de Teste",
  email: "usuario@teste.com",
  phone: "",
  team: "",
  role: "player",
  height: 0,
  weight: 0,
  inGameNumber: 0,
  position: "" as any,
  image: "",
  stats: {
    attack: {
      total: 0,
      points: 0,
      errors: 0,
      blockeds: 0,
      efficiency: 0,
    },
    block: {
      total: 0,
      points: 0,
      errors: 0,
      blockeds: 0,
    },
    serve: {
      total: 0,
      aces: 0,
      errors: 0,
      efficiency: 0,
    },
    reception: {
      total: 0,
      errors: 0,
      efficiency: 0,
    },
    defense: {
      total: 0,
      errors: 0,
      efficiency: 0,
    },
    setter: {
      total: 0,
      assists: 0,
      errors: 0,
      efficiency: 0,
    },
  },
  hasConfigured: true,
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  // Função mockada de login
  const login = async (email: string, password: string): Promise<boolean> => {
    // Simula uma requisição de API
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock de validação - apenas verifica se email e senha não estão vazios
        if (email && password) {
          // Usuário mockado
          setUser(mockUser);
          resolve(true);
        } else {
          resolve(false);
        }
      }, 500); // Simula um delay de rede
    });
  };

  const logout = () => {
    setUser(null);
  };

  const updateUserInfo = async (data: Partial<User>): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (user) {
          setUser({ ...user, ...data });
          resolve(true);
        } else {
          resolve(false);
        }
      }, 500);
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        updateUserInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}

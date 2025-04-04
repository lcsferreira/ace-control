import { createContext, useContext, useState, ReactNode } from "react";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

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
          setUser({
            id: "1",
            name: "Usuário de Teste",
            email,
          });
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

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
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

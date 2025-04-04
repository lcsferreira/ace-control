import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/auth/Login";
import Home from "./pages/Home";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import { UserConfiguration } from "./pages/user/UserConfiguration";
import { TeamCreate } from "./pages/team/TeamCreation";
import PlayerConfigForm from "./pages/user/PlayerConfigForm";
import { GameControl } from "./pages/game/GameControl";
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Rotas Públicas */}
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Register />} />
          <Route path="/esqueci-senha" element={<ForgotPassword />} />

          {/* Rota de Configuração Inicial (protegida por autenticação, mas fora do layout privado) */}
          <Route
            path="/player-config"
            element={
              <RequireAuth>
                <PlayerConfigForm />
              </RequireAuth>
            }
          />

          {/* Rotas Privadas */}
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/user-configuration" element={<UserConfiguration />} />
            <Route path="/team-create" element={<TeamCreate />} />
            <Route path="/game-control" element={<GameControl />} />
          </Route>

          {/* Rota padrão - redireciona para home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

// Componente simples para proteger a rota de configuração
function RequireAuth({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

export default App;

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/auth/Login";
import Home from "./pages/Home";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import { UserConfiguration } from "./pages/user/UserConfiguration";
import { TeamCreate } from "./pages/team/TeamCreation";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Rotas Públicas */}
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Register />} />
          <Route path="/esqueci-senha" element={<ForgotPassword />} />

          {/* Rotas Privadas */}
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/user-configuration" element={<UserConfiguration />} />
            <Route path="/team-create" element={<TeamCreate />} />
          </Route>

          {/* Rota padrão - redireciona para home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

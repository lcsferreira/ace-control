import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import PrivateLayout from "../layouts/PrivateLayout";
import ConfigurationCheck from "./ConfigurationCheck";

export default function PrivateRoute() {
  const { isAuthenticated } = useAuth();

  // Se não estiver autenticado, redireciona para a página de login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Se estiver autenticado, verifica se o usuário já configurou seu perfil
  // e renderiza o componente filho dentro do layout privado
  return (
    <ConfigurationCheck>
      <PrivateLayout>
        <Outlet />
      </PrivateLayout>
    </ConfigurationCheck>
  );
}

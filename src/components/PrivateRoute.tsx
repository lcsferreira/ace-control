import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import PrivateLayout from "../layouts/PrivateLayout";

export default function PrivateRoute() {
  const { isAuthenticated } = useAuth();

  // Se não estiver autenticado, redireciona para a página de login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Se estiver autenticado, renderiza o componente filho dentro do layout privado
  return (
    <PrivateLayout>
      <Outlet />
    </PrivateLayout>
  );
}

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

interface ConfigurationCheckProps {
  children: React.ReactNode;
}

export default function ConfigurationCheck({
  children,
}: ConfigurationCheckProps) {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Se o usuário está logado mas não configurou o perfil, redireciona para o formulário
    if (user && !user.hasConfigured) {
      navigate("/player-config");
    }
  }, [user, navigate]);

  // Se o usuário ainda não configurou o perfil, não renderiza nada (o redirecionamento acontecerá)
  if (user && !user.hasConfigured) {
    return null;
  }

  // Caso contrário, renderiza normalmente
  return <>{children}</>;
}

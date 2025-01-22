import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { appRoutes } from "@/appRoutes";
import { useUserSession } from "@/app/states/useUserId";

export const useLoginForm = () => {
  const [onError, setOnError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const { login, setIsLoggedIn } = useUserSession();

  const [loginState, setLoginState] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });

  const handleLogin = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    const onLogin = await login(loginState.email, loginState.password);
    if (onLogin) {
      router.push(appRoutes.home.url());
      setIsLoggedIn(true);
      setLoading(false);
    } else {
      setOnError(true);
      setErrorMessage(
        "Ocurrió un error al intentar iniciar sesión, por favor intente nuevamente"
      );
      setLoading(false);
    }
  };

  const handleChangeEmail = (email: string) => {
    setLoginState({ ...loginState, email });
  };

  const handleChangePassword = (password: string) => {
    setLoginState({ ...loginState, password });
  };
  return {
    handleLogin,
    onError,
    errorMessage,
    loading,
    setOnError,
    handleChangeEmail,
    handleChangePassword,
  };
};
